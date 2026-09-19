export interface StudentInput {
  age: number;
  degree: string;
  branch: string;
  cgpa: number;
  backlogs: number;
  internships: number;
  certifications: number;
  coding_skills: number;
  communication_skills: number;
  aptitude_score: number;
  projects: number;
}

export interface PredictionResponse {
  prediction: number;
  status: string;
  placement_probability: number;
}