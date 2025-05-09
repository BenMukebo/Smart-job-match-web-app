export type ConsultantData = {
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

export type EvaluationData = {
  fitScore: number;
  summary: string;
  pros: string[];
  cons: string[];
  questions: string[];
};

  export type FilterQuery = {
    location: string;
    experience: string;
    keyword: string;
    jobType: string;
    workplace: string;
  };