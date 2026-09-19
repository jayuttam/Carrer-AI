CareerAI

CareerAI is a full-stack AI-powered student placement and career guidance platform. It combines a machine-learning placement prediction model with skill-gap analysis, career-role recommendations, and learning recommendations.

Features

Student assessment form

Placement prediction using a trained Random Forest model

Placement probability and status

Skill-gap analysis

Career-role recommendations

Personalized learning recommendations

Interactive dashboard

React + TypeScript frontend

FastAPI backend

REST API integration using Axios

Local persistence of assessment data using browser localStorage

Tech Stack

Frontend

React

TypeScript

Vite

React Router

Axios

Recharts

Lucide React

CSS

Backend

Python

FastAPI

Pydantic

Uvicorn

Scikit-learn

Joblib

Machine Learning

The placement prediction model is a trained RandomForestClassifier pipeline.

The model uses:

Age

Degree

Branch

CGPA

Backlogs

Internships

Certifications

Coding skills

Communication skills

Aptitude score

Projects

Post-placement/leakage-prone fields such as company type and package are not used as prediction inputs.

Project Structure

CarrerAI/
│
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── routes/
│   │   │   ├── prediction.py
│   │   │   └── recommendation.py
│   │   ├── schemas/
│   │   │   ├── student.py
│   │   │   └── recommendation.py
│   │   └── services/
│   │       ├── prediction_services.py
│   │       └── recommendation_service.py
│   │
│   ├── ml/
│   │   └── final_placement_model.joblib
│   │
│   └── requirements.txt
│
├── frontend/
│   └── frontend/
│       ├── public/
│       ├── src/
│       │   ├── pages/
│       │   │   ├── Assessment.tsx
│       │   │   ├── Assessment.css
│       │   │   ├── Dashboard.tsx
│       │   │   └── Dashboard.css
│       │   ├── services/
│       │   │   └── api.ts
│       │   ├── types/
│       │   │   └── student.ts
│       │   ├── App.tsx
│       │   └── main.tsx
│       ├── package.json
│       └── vite.config.ts
│
└── README.md

How It Works

Student Assessment
        │
        ▼
React Frontend
        │
        │ Axios
        ▼
FastAPI Backend
        │
        ├──────────────► Random Forest Model
        │                       │
        │                       ▼
        │                Placement Prediction
        │
        └──────────────► Recommendation Service
                                │
                                ├── Skill Gaps
                                ├── Career Roles
                                └── Learning Recommendations
                                        │
                                        ▼
                                  React Dashboard

Machine Learning Model

The project uses a pre-trained Random Forest classification pipeline stored at:

backend/ml/final_placement_model.joblib

The pipeline handles preprocessing and prediction. The target variable is:

placed

The model returns a placement prediction and placement probability.

The placement model predicts placement probability. It does not directly predict a student's job role.

Recommendation System

CareerAI currently uses a rule-based recommendation layer.

It generates:

Skill Gaps

The system compares the student's current values against predefined targets for:

Coding

Communication

Aptitude

Projects

Internship Experience

Certifications

Career Roles

Based on the student's assessment profile, the system can recommend roles such as:

Software Developer

Full Stack Developer

Backend Developer

Data / Software Engineer

Technology Analyst

Web Developer

Data Analyst

These are recommendation rules, not predictions from the placement ML model.

Learning Recommendations

The system can recommend areas such as:

Programming fundamentals

Data Structures and Algorithms

Spoken English and technical communication

Quantitative aptitude

Logical reasoning

Projects

Internship/open-source experience

SQL and database fundamentals

Backend API

Start the backend and visit:

http://127.0.0.1:8000

Health Check

GET /health

Placement Prediction

POST /api/predict

Recommendations

POST /api/recommendations

FastAPI interactive API documentation:

http://127.0.0.1:8000/docs

Running the Project Locally

1. Clone the Repository

git clone https://github.com/jayuttam/Carrer-AI.git
cd Carrer-AI

2. Start the Backend

Open a terminal:

cd backend
python -m venv venv

Activate the virtual environment on Windows PowerShell:

.\venv\Scripts\Activate.ps1

Install dependencies:

pip install -r requirements.txt

Start FastAPI:

uvicorn app.main:app --reload

Backend will run at:

http://127.0.0.1:8000

3. Start the Frontend

Open another terminal:

cd frontend/frontend
npm install
npm run dev

Open the Vite development URL shown in the terminal, normally:

http://localhost:5173

Frontend Routes

Route

Purpose

/

Student assessment

/dashboard

Placement and career dashboard

API Integration

The frontend communicates with FastAPI through Axios.

The API base URL is currently:

http://127.0.0.1:8000/api

The main API functions are:

predictPlacement()
getRecommendations()

Data Flow

Student enters assessment information.

React validates and submits the assessment.

Axios sends the data to FastAPI.

FastAPI sends the input through the trained ML pipeline.

The backend returns placement prediction and probability.

The recommendation service calculates skill gaps and career recommendations.

Results are displayed on the dashboard.

Assessment data and prediction results are temporarily stored in browser localStorage.

Current Status

Completed

React frontend setup

Student assessment page

FastAPI backend

Placement prediction API

Trained Random Forest model integration

Axios frontend-backend integration

Dashboard

Skill-gap analysis

Career-role recommendation layer

Learning recommendations

React routing

GitHub repository setup

Planned Improvements

More interactive dashboard components

Personalized learning roadmap with progress tracking

More detailed skill analytics

Improved career recommendation engine

User authentication

Database integration

Student profile persistence

Deployment

Automated testing

Production configuration

Important Notes

The current recommendation engine is rule-based.

The placement model is a classification model and should not be interpreted as a guarantee of placement.

LocalStorage is currently used for temporary client-side persistence.

The application is currently configured for local development.

Future Vision

CareerAI is intended to evolve into a complete student career-support platform where students can:

Assess Skills
     ↓
Predict Placement Readiness
     ↓
Identify Skill Gaps
     ↓
Explore Suitable Career Roles
     ↓
Follow a Personalized Learning Roadmap
     ↓
Track Progress
     ↓
Improve Placement Readiness

Author

Jay Uttam

B.Tech Computer Science & Engineering
