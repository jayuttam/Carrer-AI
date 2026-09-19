from fastapi import APIRouter

from app.schemas.recommendation import (
    RecommendationRequest,
    RecommendationResponse,
)
from app.services.recommendation_service import (
    generate_recommendations,
)


router = APIRouter(
    prefix="/api",
    tags=["Recommendations"],
)


@router.post(
    "/recommendations",
    response_model=RecommendationResponse,
)
def recommendations(
    student: RecommendationRequest,
):
    student_data = student.model_dump()

    return generate_recommendations(student_data)