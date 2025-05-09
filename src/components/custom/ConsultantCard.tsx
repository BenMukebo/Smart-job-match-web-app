import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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

interface ConsultantProps {
  consultant: Consultant;
  evaluation?: Evaluation;
  loading: boolean;
}

const ConsultantCard: React.FC<ConsultantProps> = ({
  consultant,
  evaluation,
  loading,
}) => {
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  // Deterministic profile image based on consultant ID
  const getProfileImage = (id: number) => {
    return `https://i.pravatar.cc/150?img=${(id % 70) + 1}`;
  };

  return (
    <Card
      key={consultant.id}
      className="flex flex-col border border-indigo-200 dark:border-indigo-800/20 shadow-md bg-white/90 dark:bg-indigo-950/20 backdrop-blur-sm hover:shadow-lg transition-shadow"
    >
      <CardHeader className="p-2 bg-gradient-to-r from-indigo-50 to-violet-50 dark:from-indigo-900/20 dark:to-violet-900/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 border-2 border-primary/20 shadow-sm">
              <AvatarImage src={getProfileImage(consultant.id)} alt={consultant.name} />
              <AvatarFallback className="bg-primary/10 text-primary font-medium">
                {getInitials(consultant.name)}
              </AvatarFallback>
            </Avatar>
            <CardTitle>{consultant.name}</CardTitle>
          </div>
          <Badge className="bg-indigo-600 text-white hover:bg-indigo-700">
            {consultant.location}
          </Badge>
        </div>
        <div className="text-sm text-muted-foreground">
          {consultant.experience} yrs exp • {consultant.skills.join(", ")}
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-300 dark:border-blue-800/30"
          >
            {consultant.jobType}
          </Badge>
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-300 dark:border-green-800/30"
          >
            {consultant.workplace}
          </Badge>
          <Badge
            variant="outline"
            className="bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-300 dark:border-amber-800/30"
          >
            ${consultant.hourlyRate}/hr
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-2">
        <div className="mb-2">{consultant.bio}</div>
        {evaluation ? (
          <>
            <div>
              <span className="font-semibold">Fit Score:</span>{" "}
              <span className="text-indigo-600 dark:text-indigo-400 font-bold">
                {evaluation.fitScore}
              </span>
            </div>
            <div>
              <span className="font-semibold">Summary:</span> {evaluation.summary}
            </div>
            <div>
              <span className="font-semibold text-green-700 dark:text-green-500">
                Pros:
              </span>
              <ul className="list-disc ml-5">
                {evaluation.pros.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>
            <div>
              <span className="font-semibold text-red-700 dark:text-red-500">Cons:</span>
              <ul className="list-disc ml-5">
                {evaluation.cons.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>
            <div>
              <span className="font-semibold text-blue-700 dark:text-blue-500">
                Suggested Questions:
              </span>
              <ul className="list-disc ml-5">
                {evaluation.questions.map((q, i) => (
                  <li key={i}>{q}</li>
                ))}
              </ul>
            </div>
          </>
        ) : (
          <div className="italic text-muted-foreground">
            {loading
              ? "Evaluating..."
              : "Click 'Evaluate Consultants' to see AI insights."}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ConsultantCard;
