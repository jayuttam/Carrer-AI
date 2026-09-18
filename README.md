# 🚀 CareerAI — AI-Powered Student Placement & Career Readiness Platform

CareerAI is a full-stack AI/ML application designed to help students understand their placement readiness through **machine-learning-based placement prediction, skill analysis, and personalized improvement recommendations**.

The project uses the **Indian Student Placement Dataset 2025** from Kaggle and combines a Python ML pipeline with a FastAPI backend and React + TypeScript frontend.

---

## 🎯 Problem Statement

Students often have difficulty understanding how their academic performance, technical skills, internships, certifications, and aptitude performance affect their placement readiness.

CareerAI provides a data-driven approach by analyzing student attributes and predicting whether a student is likely to be placed.

The platform also provides actionable recommendations based on the student's profile to help improve their career readiness.

---

## ✨ Key Features

### 🤖 Placement Prediction

A Machine Learning classification model predicts whether a student is likely to be placed based on their profile.

The prediction uses features such as:

* CGPA
* Backlogs
* Internships
* Certifications
* Coding skills
* Communication skills
* Aptitude score
* Projects
* Degree
* Branch
* Age
* Gender

### 📊 Placement Probability

The trained model can provide a probability score along with the predicted placement status.

Example:

```text
Placement Probability: 82%

Prediction: Likely Placed
```

> **Note:** The probability is a model output and should not be interpreted as a guarantee of actual placement.

---

### 🧠 Skill Gap Analysis

CareerAI analyzes a student's profile and identifies areas that may require improvement.

Example:

```text
Skill Analysis

Coding Skills          8/10
Communication Skills   6/10
Aptitude Score         72/100
Projects               2
Internships            1
```

---

### 🎯 Personalized Recommendations

The recommendation engine generates improvement suggestions based on the student's profile.

Example:

```text
Recommended Improvements

1. Improve Data Structures & Algorithms
2. Strengthen SQL fundamentals
3. Build more practical projects
4. Improve aptitude performance
5. Gain internship experience
```

---

### 📈 Interactive Dashboard

The React dashboard displays:

* Placement prediction
* Placement probability
* Academic profile
* Technical skills
* Aptitude performance
* Internship experience
* Certifications
* Projects
* Improvement recommendations

---

### 🌐 REST API

FastAPI provides REST APIs for:

* Student assessment
* Placement prediction
* Student profile
* Recommendations
* Health/status monitoring

Interactive API documentation is automatically generated using Swagger/OpenAPI.

---

## 🏗️ System Architecture

```text
                    ┌─────────────────────────┐
                    │      React + TS         │
                    │      Frontend           │
                    └────────────┬────────────┘
                                 │
                              REST API
                                 │
                                 ▼
                    ┌─────────────────────────┐
                    │        FastAPI          │
                    │        Backend          │
                    └────────────┬────────────┘
                                 │
                ┌────────────────┼────────────────┐
                │                │                │
                ▼                ▼                ▼
        ┌──────────────┐ ┌──────────────┐ ┌──────────────┐
        │ ML Prediction│ │Recommendation│ │   MongoDB    │
        │   Service    │ │   Service    │ │   Database   │
        └──────┬───────┘ └──────────────┘ └──────────────┘
               │
               ▼
        ┌─────────────────┐
        │ Scikit-learn ML │
        │      Model      │
        └─────────────────┘
```

---

# 📊 Dataset

### Indian Student Placement Dataset 2025

The project uses the Kaggle dataset:

```text
Indian_Student_Placement_Dataset_2025.csv
```

### Dataset Size

```text
Rows:    12,000
Columns: 16
```

### Dataset Features

| Feature                | Description                        |
| ---------------------- | ---------------------------------- |
| `student_id`           | Unique student identifier          |
| `gender`               | Student gender                     |
| `age`                  | Student age                        |
| `degree`               | Degree type                        |
| `branch`               | Academic branch                    |
| `cgpa`                 | CGPA                               |
| `backlogs`             | Number of backlogs                 |
| `internships`          | Number of internships              |
| `certifications`       | Number of certifications           |
| `coding_skills`        | Coding skill score                 |
| `communication_skills` | Communication skill score          |
| `aptitude_score`       | Aptitude score                     |
| `projects`             | Number of projects                 |
| `placed`               | Placement status — target variable |
| `company_type`         | Company category                   |
| `package_lpa`          | Placement package in LPA           |

---

## ⚠️ Data Leakage Prevention

The target variable is:

```text
placed
```

The model does **not** use post-placement information such as:

```text
company_type
package_lpa
```

as input features.

This prevents **data leakage**, because these values are only available after a placement outcome is known.

The `student_id` field is also excluded from model training because it is an identifier rather than a meaningful predictive feature.

---

# 🧠 Machine Learning Pipeline

```text
                 Dataset
                    │
                    ▼
             Data Validation
                    │
                    ▼
              Data Cleaning
                    │
                    ▼
        Exploratory Data Analysis
                    │
                    ▼
        Feature Preprocessing
                    │
                    ▼
          Train / Test Split
                    │
                    ▼
            Model Training
                    │
          ┌─────────┼─────────┐
          ▼         ▼         ▼
      Logistic   Random    Gradient
     Regression  Forest    Boosting
          │         │         │
          └─────────┼─────────┘
                    ▼
             Model Evaluation
                    │
                    ▼
             Best Model
                    │
                    ▼
            Joblib Serialization
                    │
                    ▼
             FastAPI Inference
```

### Candidate Models

The project can compare:

* Logistic Regression
* Decision Tree
* Random Forest
* Gradient Boosting
* XGBoost

Model selection is based on validation performance rather than simply choosing the model with the highest training accuracy.

---

# 🛠️ Technology Stack

## Frontend

| Technology   | Purpose                  |
| ------------ | ------------------------ |
| React        | User interface           |
| TypeScript   | Type-safe development    |
| Tailwind CSS | UI styling               |
| Recharts     | Charts and visualization |
| Axios        | API communication        |

## Backend

| Technology | Purpose            |
| ---------- | ------------------ |
| Python     | Backend and ML     |
| FastAPI    | REST API           |
| Pydantic   | Request validation |
| Uvicorn    | ASGI server        |

## Machine Learning

| Technology   | Purpose               |
| ------------ | --------------------- |
| Pandas       | Data processing       |
| NumPy        | Numerical computation |
| Scikit-learn | Machine Learning      |
| XGBoost      | Gradient boosting     |
| Joblib       | Model serialization   |

## Database

```text
MongoDB
```

## Development

```text
Git
GitHub
VS Code
Jupyter Notebook
Docker
```

---

# 📂 Project Structure

```text
CareerAI/
│
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── config.py
│   │   │
│   │   ├── routes/
│   │   │   ├── prediction.py
│   │   │   ├── recommendation.py
│   │   │   └── student.py
│   │   │
│   │   ├── schemas/
│   │   │   └── student.py
│   │   │
│   │   ├── services/
│   │   │   ├── prediction_service.py
│   │   │   └── recommendation_service.py
│   │   │
│   │   └── ml/
│   │       ├── placement_model.joblib
│   │       ├── preprocess.py
│   │       └── predict.py
│   │
│   ├── requirements.txt
│   └── Dockerfile
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.tsx
│   │   │   ├── PredictionCard.tsx
│   │   │   ├── SkillCard.tsx
│   │   │   └── RecommendationCard.tsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Dashboard.tsx
│   │   │   └── Assessment.tsx
│   │   │
│   │   ├── services/
│   │   │   └── api.ts
│   │   │
│   │   ├── types/
│   │   │   └── student.ts
│   │   │
│   │   └── App.tsx
│   │
│   ├── package.json
│   └── Dockerfile
│
├── dataset/
│   └── Indian_Student_Placement_Dataset_2025.csv
│
├── notebooks/
│   ├── 01_eda.ipynb
│   └── 02_model_training.ipynb
│
├── tests/
│   ├── test_prediction.py
│   └── test_api.py
│
├── docker-compose.yml
├── .env.example
├── .gitignore
└── README.md
```

---

# 🔌 API Endpoints

## Health Check

```http
GET /
```

Example response:

```json
{
  "message": "CareerAI API is running"
}
```

---

## Placement Prediction

```http
POST /predict
```

### Request

```json
{
  "gender": "Male",
  "age": 22,
  "degree": "B.Tech",
  "branch": "CSE",
  "cgpa": 8.4,
  "backlogs": 0,
  "internships": 2,
  "certifications": 4,
  "coding_skills": 8,
  "communication_skills": 7,
  "aptitude_score": 82,
  "projects": 3
}
```

### Response

```json
{
  "placement_probability": 0.82,
  "prediction": "Likely Placed"
}
```

---

## Recommendations

```http
POST /recommendations
```

Example response:

```json
{
  "skill_gaps": [
    "Data Structures & Algorithms",
    "SQL",
    "Communication"
  ],
  "recommendations": [
    "Practice DSA regularly",
    "Complete SQL projects",
    "Improve communication skills"
  ]
}
```

---

# ⚙️ Installation

## 1. Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/CareerAI.git

cd CareerAI
```

---

# 🐍 Backend Setup

```bash
cd backend
```

Create a virtual environment:

```bash
python -m venv venv
```

Windows:

```bash
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

---

## 🔑 Environment Variables

Create:

```text
.env
```

Example:

```env
MONGO_URI=your_mongodb_connection_string
SECRET_KEY=your_secret_key
```

Never commit `.env` to GitHub.

---

# ▶️ Run Backend

```bash
uvicorn app.main:app --reload
```

API:

```text
http://127.0.0.1:8000
```

Swagger documentation:

```text
http://127.0.0.1:8000/docs
```

---

# ⚛️ Frontend Setup

Open another terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run development server:

```bash
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

# 🐳 Docker

Build and start the application:

```bash
docker-compose up --build
```

Stop:

```bash
docker-compose down
```

---

# 🔄 Application Workflow

```text
Student
   │
   ▼
Enter Academic & Skill Information
   │
   ▼
React Frontend
   │
   ▼
FastAPI REST API
   │
   ▼
Input Validation
   │
   ▼
ML Preprocessing
   │
   ▼
Placement Prediction
   │
   ├──────────────► Probability
   │
   └──────────────► Prediction
   │
   ▼
Skill Analysis
   │
   ▼
Recommendations
   │
   ▼
CareerAI Dashboard
```

---

# 🧪 Testing

API testing can be performed using:

* FastAPI Swagger
* Postman
* Pytest

Run tests:

```bash
pytest
```

---

# 🔐 Security

The application follows basic security practices including:

* Input validation using Pydantic
* Environment variables for secrets
* Protected configuration
* Secure database credentials
* `.env` excluded from Git
* Validation before ML inference

---

# 🚀 Future Enhancements

* [ ] Resume parsing using NLP
* [ ] Job-role recommendation system
* [ ] Resume scoring
* [ ] AI career assistant
* [ ] Interview preparation
* [ ] Job description matching
* [ ] Skill extraction from resumes
* [ ] Admin analytics dashboard
* [ ] Cloud deployment
* [ ] CI/CD pipeline
* [ ] Model monitoring
* [ ] Model retraining pipeline

---

# 🎓 Skills Demonstrated

This project demonstrates practical experience in:

```text
Python
        │
        ├── Machine Learning
        ├── Data Processing
        └── FastAPI

TypeScript
        │
        └── React

Database
        │
        └── MongoDB

Engineering
        │
        ├── REST APIs
        ├── Modular Architecture
        ├── Validation
        ├── Testing
        ├── Docker
        └── Git/GitHub
```

---

# 💡 Project Highlights

CareerAI is designed as an **end-to-end production-style application**, rather than a standalone machine-learning notebook.

The complete workflow is:

```text
Dataset
   ↓
Data Analysis
   ↓
Machine Learning
   ↓
Model Serialization
   ↓
FastAPI
   ↓
REST API
   ↓
React + TypeScript
   ↓
Interactive Dashboard
```

This demonstrates the integration of **AI/ML with modern full-stack software development**.

---

# 👨‍💻 Author

**Jay**

B.Tech — Computer Science & Engineering

### Areas of Interest

* Software Development
* Full Stack Development
* Python
* Machine Learning
* Data Science
* Backend Development
* Cloud & DevOps

---

# 📄 License

This project is developed for educational and portfolio purposes.
