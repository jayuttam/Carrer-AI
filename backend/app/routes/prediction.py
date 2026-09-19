from fastapi import APIRouter, HTTPException

from app.schemas.student import StudentInput
from app.services.prediction_services import predict_placement


router = APIRouter(
    prefix="/api",
    tags=["Prediction"]
)


@router.post("/predict")
def predict(student: StudentInput):

    try:
        result = predict_placement(student.model_dump())

        return result

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Prediction failed: {str(e)}"
        )