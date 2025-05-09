import { useState, useEffect } from "react";
import data from "./api/data.json";
import mainSummary from "./config/gemini";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "./components/ui/textarea";

import Footer from "./layout/footer";
import Header from "./layout/header";
// import SearchHistory from "./components/SearchHistory";
import SearchHistory from "./components/custom/SearchHistory";
import ConsultantCard from "./components/custom/ConsultantCard";

type Consultant = {
  id: number;
  name: string;
  location: string;
  experience: number;
  skills: string[];
  bio: string;
  jobType: string;
  workplace: string;
  hourlyRate: number;
};

type Evaluation = {
  fitScore: number;
  summary: string;
  pros: string[];
  cons: string[];
  questions: string[];
};

function App() {
  const [jobDesc, setJobDesc] = useState("");
  const [evaluations, setEvaluations] = useState<Record<number, Evaluation>>({});
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    location: "",
    experience: "",
    keyword: "",
    jobType: "",
    workplace: "",
  });
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [activeHistoryIdx, setActiveHistoryIdx] = useState<number | null>(null);

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

  const consultants: Consultant[] = data;

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

  const uniqueLocations = Array.from(new Set(consultants.map((c) => c.location)));
  const uniqueJobTypes = Array.from(new Set(consultants.map((c) => c.jobType)));
  const uniqueWorkplaces = Array.from(new Set(consultants.map((c) => c.workplace)));

  const handleEvaluate = async (desc?: string) => {
    setLoading(true);
    const evals: Record<number, Evaluation> = {};
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
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 via-white to-violet-50 dark:from-indigo-950 dark:via-gray-950 dark:to-violet-950 text-foreground">
      {/* Header */}

      <Header />
      {/* Main Content */}
      <div className="flex flex-1 min-h-0 relative">
        {/* Sidebar */}
        <SearchHistory
          searchHistory={searchHistory}
          activeHistoryIdx={activeHistoryIdx}
          onHistoryClick={handleHistoryClick}
          onHistoryDelete={handleHistoryDelete}
          onHistoryClear={handleHistoryClear}
        />
        {/* Main Panel */}
        <main className="flex-1 flex flex-col items-stretch min-w-0 pt-28 sm:pt-20">
          <div className="max-w-5xl mx-auto w-full py-8 px-2 md:px-8 space-y-6">
            <Card className="border border-indigo-200 dark:border-indigo-800/20 shadow-md bg-white/90 dark:bg-indigo-950/20 backdrop-blur-sm">
              <CardHeader className="bg-gradient-to-r from-indigo-50 to-violet-50 dark:from-indigo-900/20 dark:to-violet-900/20">
                <CardTitle className="text-indigo-700 dark:text-indigo-300 py-2">Job Description</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Paste or write the job description here..."
                  value={jobDesc}
                  onChange={(e) => setJobDesc(e.target.value)}
                  className="w-full border-indigo-200 dark:border-indigo-800/30 focus:border-indigo-500 bg-white/50 dark:bg-indigo-950/20"
                  rows={4}
                />
                <div className="flex flex-wrap gap-4 mt-4">
                  <Select
                    value={filters.location}
                    onValueChange={(v) => setFilters((f) => ({ ...f, location: v }))}
                  >
                    <SelectTrigger className="w-[180px] border-indigo-200 dark:border-indigo-800/30">
                      <SelectValue placeholder="Location" />
                    </SelectTrigger>
                    <SelectContent>
                      {/* <SelectItem value="a">All Locations</SelectItem> */}
                      {uniqueLocations.map((loc) => (
                        <SelectItem key={loc} value={loc}>
                          {loc}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Select
                    value={filters.jobType}
                    onValueChange={(v) => setFilters((f) => ({ ...f, jobType: v }))}
                  >
                    <SelectTrigger className="w-[180px] border-indigo-200 dark:border-indigo-800/30">
                      <SelectValue placeholder="Job Type" />
                    </SelectTrigger>
                    <SelectContent>
                      {/* <SelectItem value="">All Job Types</SelectItem> */}
                      {uniqueJobTypes.map((type) => (
                        <SelectItem key={type} value={type}>
                          {type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Select
                    value={filters.workplace}
                    onValueChange={(v) => setFilters((f) => ({ ...f, workplace: v }))}
                  >
                    <SelectTrigger className="w-[180px] border-indigo-200 dark:border-indigo-800/30">
                      <SelectValue placeholder="Workplace" />
                    </SelectTrigger>
                    <SelectContent>
                      {/* <SelectItem value="">All Workplaces</SelectItem> */}
                      {uniqueWorkplaces.map((workplace) => (
                        <SelectItem key={workplace} value={workplace}>
                          {workplace}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Input
                    type="number"
                    min={0}
                    placeholder="Min Experience"
                    value={filters.experience}
                    onChange={(e) =>
                      setFilters((f) => ({ ...f, experience: e.target.value }))
                    }
                    className="w-40 border-indigo-200 dark:border-indigo-800/30"
                  />
                  <Input
                    placeholder="Keyword"
                    value={filters.keyword}
                    onChange={(e) =>
                      setFilters((f) => ({ ...f, keyword: e.target.value }))
                    }
                    className="w-40 border-indigo-200 dark:border-indigo-800/30"
                  />
                  <Button
                    onClick={() => handleEvaluate()}
                    disabled={!jobDesc || loading}
                    className="ml-auto bg-indigo-600 hover:bg-indigo-700 text-white"
                  >
                    {loading ? "Evaluating..." : "Evaluate Consultants"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredConsultants.map((consultant) => (
                <ConsultantCard key={consultant?.id} consultant={consultant} evaluation={evaluations[consultant.id]} loading={loading} />
              ))}
            </div>
          </div>
        </main>
      </div>
      {/* Footer */}

      <Footer />
    </div>
  );
}

export default App;
