import React from "react";
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
import { Textarea } from "@/components/ui/textarea";

import ConsultantCard from "@/components/custom/ConsultantCard";
import data from "@/api/data.json";
import type { ConsultantData, EvaluationData, FilterQuery } from "@/lib/types";

type MainProps = {
  jobDesc: string;
  setJobDesc: (desc: string) => void;
  loading: boolean;
  filters: FilterQuery;
  setFilters: React.Dispatch<React.SetStateAction<FilterQuery>>;
  handleEvaluate: () => void;
  evaluations: Record<number, EvaluationData>;
  filteredConsultants: ConsultantData[];
};

const MainPanel: React.FC<MainProps> = ({
  jobDesc,
  setJobDesc,
  loading,
  filters,
  setFilters,
  handleEvaluate,
  evaluations,
  filteredConsultants,

}) => {
  const consultants: ConsultantData[] = data;
  const uniqueLocations = Array.from(new Set(consultants.map((c) => c.location)));
  const uniqueJobTypes = Array.from(new Set(consultants.map((c) => c.jobType)));
  const uniqueWorkplaces = Array.from(new Set(consultants.map((c) => c.workplace)));

  return (
    <section className="flex-1 flex flex-col items-stretch min-w-0 pt-28 sm:pt-20">
      <div className="max-w-5xl mx-auto w-full py-8 px-2 md:px-8 space-y-6">
        <Card className="border border-indigo-200 dark:border-indigo-800/20 shadow-md bg-white/90 dark:bg-indigo-950/20 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-indigo-50 to-violet-50 dark:from-indigo-900/20 dark:to-violet-900/20">
            <CardTitle className="text-indigo-700 dark:text-indigo-300 py-2">
              Job Description
            </CardTitle>
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
                onValueChange={(v) =>
                  setFilters((f) => ({ ...f, location: v === "all" ? "" : v }))
                }
              >
                <SelectTrigger className="w-[180px] border-indigo-200 dark:border-indigo-800/30">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  {uniqueLocations.map((loc) => (
                    <SelectItem key={loc} value={loc}>
                      {loc}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={filters.jobType}
                onValueChange={(v) =>
                  setFilters((f) => ({ ...f, jobType: v === "all" ? "" : v }))
                }
              >
                <SelectTrigger className="w-[180px] border-indigo-200 dark:border-indigo-800/30">
                  <SelectValue placeholder="Job Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Job Types</SelectItem>
                  {uniqueJobTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={filters.workplace}
                onValueChange={(v) =>
                  setFilters((f) => ({ ...f, workplace: v === "all" ? "" : v }))
                }
              >
                <SelectTrigger className="w-[180px] border-indigo-200 dark:border-indigo-800/30">
                  <SelectValue placeholder="Workplace" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Workplaces</SelectItem>
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
                onChange={(e) => setFilters((f) => ({ ...f, keyword: e.target.value }))}
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

        <div className="grid md:grid-cols-2 xxl:grid-cols-3 gap-6">
          {filteredConsultants.map((consultant) => (
            <ConsultantCard
              key={consultant?.id}
              consultant={consultant}
              evaluation={evaluations[consultant.id]}
              loading={loading}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default MainPanel;
