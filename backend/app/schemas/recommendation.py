from pydantic import BaseModel


class RecommendationRequest(BaseModel):
    age: int
    degree: str
    branch: str
    cgpa: float
    backlogs: int
    internships: int
    certifications: int
    coding_skills: float
    communication_skills: float
    aptitude_score: float
    projects: int


class SkillGap(BaseModel):
    skill: str
    current: float
    required: float
    gap: float
    recommendation: str


class RecommendationResponse(BaseModel):
    skill_gaps: list[SkillGap]
    career_roles: list[str]
    learning_recommendations: list[str]