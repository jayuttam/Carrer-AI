from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

from app.routes.prediction import router as prediction_router
from app.routes.recommendation import router as recommendation_router


app = FastAPI(
    title="CareerAI API",
    description="AI-powered Student Placement Prediction API",
    version="1.0.0"
)


# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# API routes
app.include_router(prediction_router)
app.include_router(recommendation_router)


# Health check
@app.get("/health")
def health():
    return {
        "status": "healthy"
    }


# React frontend
FRONTEND_DIR = Path("/app/frontend/dist")


# Serve React assets
if (FRONTEND_DIR.exists()):

    assets_dir = FRONTEND_DIR / "assets"

    if assets_dir.exists():
        app.mount(
            "/assets",
            StaticFiles(directory=assets_dir),
            name="assets"
        )


# React home page
@app.get("/")
async def serve_home():
    return FileResponse(
        FRONTEND_DIR / "index.html"
    )


# React Router support
@app.get("/{full_path:path}")
async def serve_frontend(full_path: str):

    requested_file = FRONTEND_DIR / full_path

    if requested_file.is_file():
        return FileResponse(requested_file)

    return FileResponse(
        FRONTEND_DIR / "index.html"
    )