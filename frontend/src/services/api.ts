
import axios from "axios";
import type {
  StudentInput,
  PredictionResponse,
} from "../types/student";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export const predictPlacement = async (
  student: StudentInput
): Promise<PredictionResponse> => {
  const response = await api.post<PredictionResponse>(
    "/predict",
    student
  );

  return response.data;
};

// ================================
// Recommendation API
// ================================

export interface SkillGap {
  skill: string;
  current: number;
  required: number;
  gap: number;
  recommendation: string;
}

export interface RecommendationResponse {
  skill_gaps: SkillGap[];
  career_roles: string[];
  learning_recommendations: string[];
}

export const getRecommendations = async (
  student: StudentInput
): Promise<RecommendationResponse> => {
  const response = await api.post<RecommendationResponse>(
    "/recommendations",
    student
  );

  return response.data;
};