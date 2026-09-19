from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.prediction import router as prediction_router
from app.routes.recommendation import router as recommendation_router


app = FastAPI(
    title="CareerAI API",
    description="AI-powered Student Placement Prediction API",
    version="1.0.0"
)


# CORS - allows React frontend to communicate with FastAPI
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Register routes
app.include_router(prediction_router)
app.include_router(recommendation_router)


@app.get("/")
def home():
    return {
        "message": "CareerAI API is running",
        "version": "1.0.0"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }
