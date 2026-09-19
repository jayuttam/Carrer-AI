from pydantic import BaseModel, Field


class StudentInput(BaseModel):
    age: int = Field(..., ge=18, le=60)
    degree: str
    branch: str
    cgpa: float = Field(..., ge=0, le=10)
    backlogs: int = Field(..., ge=0)
    internships: int = Field(..., ge=0)
    certifications: int = Field(..., ge=0)
    coding_skills: float = Field(..., ge=0, le=10)
    communication_skills: float = Field(..., ge=0, le=10)
    aptitude_score: float = Field(..., ge=0, le=100)
    projects: int = Field(..., ge=0)