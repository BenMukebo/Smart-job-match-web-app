import React from 'react';
import { useState, useEffect } from "react";
import { useSearchParams } from 'react-router';

import data from "@/api/data.json";
import mainSummary from "@/config/gemini";

import SearchHistory from "@/components/custom/SearchHistory";
import type { ConsultantData, EvaluationData, FilterQuery } from "@/lib/types";
import MainPanel from "@/components/MainPanel";

const Home: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [jobDesc, setJobDesc] = useState("");
  const [evaluations, setEvaluations] = useState<Record<number, EvaluationData>>({});
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<FilterQuery>({
    location: searchParams.get('location') || "",
    experience: searchParams.get('experience') || "",
    keyword: searchParams.get('keyword') || "",
    jobType: searchParams.get('jobType') || "",
    workplace: searchParams.get('workplace') || "",
  });
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [activeHistoryIdx, setActiveHistoryIdx] = useState<number | null>(null);


  const handleFilterChange = (key: keyof FilterQuery, value: string) => {
    setFilters((prev) => {
      const newFilters = { ...prev, [key]: value };
      const newParams = new URLSearchParams(searchParams); // not empty

      Object.entries(newFilters).forEach(([k, v]) => {
        if (v) {
          newParams.set(k, v);
        } else {
          newParams.delete(k);
        }
      });
      setSearchParams(newParams);
      return newFilters;
    });
  };

  useEffect(() => {
    const savedHistory = localStorage.getItem('searchHistory');
    if (savedHistory) {
      try {
        const parsedHistory = JSON.parse(savedHistory);
        if (Array.isArray(parsedHistory)) {
          setSearchHistory(parsedHistory);
        }
      } catch (e) {
        console.error('Failed to parse search history from localStorage', e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  }, [searchHistory]);

  const consultants: ConsultantData[] = data;

  const filteredConsultants = consultants.filter((c) => {
    const matchLocation = filters.location
      ? c.location === filters.location
      : true;
    const matchExperience = filters.experience
      ? c.experience >= Number(filters.experience)
      : true;
    const matchKeyword = filters.keyword
      ? (
          c.name +
          c.skills.join(" ") +
          c.bio
        )
          .toLowerCase()
          .includes(filters.keyword.toLowerCase())
      : true;
    const matchJobType = filters.jobType
      ? c.jobType === filters.jobType
      : true;
    const matchWorkplace = filters.workplace
      ? c.workplace === filters.workplace
      : true;
    return matchLocation && matchExperience && matchKeyword && matchJobType && matchWorkplace;
  });

  const handleEvaluate = async (desc?: string) => {
    setLoading(true);
    const evals: Record<number, EvaluationData> = {};
    const usedDesc = desc ?? jobDesc;
    for (const c of filteredConsultants) {
      const prompt = `
        Job Description: ${usedDesc}
        Consultant Profile: 
        Name: ${c.name}
        Location: ${c.location}
        Experience: ${c.experience} years
        Skills: ${c.skills.join(", ")}
        Bio: ${c.bio}
        Job Type: ${c.jobType}
        Workplace: ${c.workplace}
        Hourly Rate: $${c.hourlyRate}

        Evaluate this consultant for the job. 
        Respond in JSON with keys: fitScore (0-100), summary, pros (array), cons (array), questions (array).
      `;
      try {
        let responseText = "";
        await mainSummary(prompt, (chunk: string) => {
          responseText += chunk;
        });
        // Try to extract JSON from responseText
        const jsonMatch = responseText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const evalObj = JSON.parse(jsonMatch[0]);
          evals[c.id] = evalObj;
        } else {
          evals[c.id] = {
            fitScore: 0,
            summary: "No evaluation received.",
            pros: [],
            cons: [],
            questions: [],
          };
        }
      } catch (e) {
        evals[c.id] = {
          fitScore: 0,
          summary: "Error evaluating.",
          pros: [],
          cons: [],
          questions: [],
        };
      }
    }
    setEvaluations(evals);
    setLoading(false);

    // Only add to history if it's a new search
    if (desc === undefined && jobDesc.trim() && !searchHistory.includes(jobDesc.trim())) {
      setSearchHistory([jobDesc.trim(), ...searchHistory].slice(0, 10));
      setActiveHistoryIdx(0);
    }
    if (desc !== undefined) {
      setActiveHistoryIdx(searchHistory.findIndex((d) => d === desc));
    }
  };

  const handleHistoryClick = (desc: string, idx: number) => {
    setJobDesc(desc);
    setActiveHistoryIdx(idx);
    setEvaluations({});
    handleEvaluate(desc);
  };

  const handleHistoryDelete = (idx: number) => {
    const newHistory = [...searchHistory];
    newHistory.splice(idx, 1);
    setSearchHistory(newHistory);
    
    // Reset active index if we deleted the active item
    if (activeHistoryIdx === idx) {
      setActiveHistoryIdx(null);
    } else if (activeHistoryIdx !== null && activeHistoryIdx > idx) {
      // Adjust the active index if we deleted an item before it
      setActiveHistoryIdx(activeHistoryIdx - 1);
    }
  };

  const handleHistoryClear = () => {
    setSearchHistory([]);
    setActiveHistoryIdx(null);
  };

  return (
    <div className="flex flex-1 min-h-screen relative">
    {/* Sidebar */}
    <SearchHistory
      searchHistory={searchHistory}
      activeHistoryIdx={activeHistoryIdx}
      onHistoryClick={handleHistoryClick}
      onHistoryDelete={handleHistoryDelete}
      onHistoryClear={handleHistoryClear}
    />

    <MainPanel
      jobDesc={jobDesc}
      setJobDesc={setJobDesc}
      filters={filters}
      handleFilterChange={handleFilterChange}
      loading={loading}
      handleEvaluate={handleEvaluate}
      filteredConsultants={filteredConsultants}
      evaluations={evaluations}
    />
  </div>
  )
}

export default Home