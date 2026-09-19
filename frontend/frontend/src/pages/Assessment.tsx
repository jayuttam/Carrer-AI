import { useState, type FormEvent } from "react";
import {
  Brain,
  Code2,
  MessageSquare,
  Target,
  Briefcase,
  Award,
  GraduationCap,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  RotateCcw,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";
import { predictPlacement } from "../services/api";
import type { StudentInput, PredictionResponse } from "../types/student";
import "./Assessment.css";

const initialForm: StudentInput = {
  age: 22,
  degree: "B.Tech",
  branch: "CSE",
  cgpa: 8,
  backlogs: 0,
  internships: 1,
  certifications: 2,
  coding_skills: 7,
  communication_skills: 7,
  aptitude_score: 75,
  projects: 2,
};

function Assessment() {
  const [form, setForm] = useState<StudentInput>(initialForm);
  const [result, setResult] = useState<PredictionResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const updateNumber = (field: keyof StudentInput, value: string) => {
    const numberValue = value === "" ? 0 : Number(value);

    setForm((previous) => ({
      ...previous,
      [field]: Number.isFinite(numberValue) ? numberValue : 0,
    }));

    if (error) setError("");
  };

  const updateText = (
    field: "degree" | "branch",
    value: string
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));

    if (error) setError("");
  };

  const validateForm = () => {
    if (form.age < 18 || form.age > 60) {
      return "Age must be between 18 and 60.";
    }

    if (!form.degree.trim() || !form.branch.trim()) {
      return "Please enter your degree and branch.";
    }

    if (form.cgpa < 0 || form.cgpa > 10) {
      return "CGPA must be between 0 and 10.";
    }

    if (form.coding_skills < 0 || form.coding_skills > 10) {
      return "Coding skills must be between 0 and 10.";
    }

    if (
      form.communication_skills < 0 ||
      form.communication_skills > 10
    ) {
      return "Communication skills must be between 0 and 10.";
    }

    if (form.aptitude_score < 0 || form.aptitude_score > 100) {
      return "Aptitude score must be between 0 and 100.";
    }

    if (
      form.backlogs < 0 ||
      form.internships < 0 ||
      form.certifications < 0 ||
      form.projects < 0
    ) {
      return "Experience and achievement values cannot be negative.";
    }

    return "";
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);
      setError("");
      setResult(null);

      const response = await predictPlacement(form);

      setResult(response);

      localStorage.setItem(
        "careerai_student",
        JSON.stringify(form)
      );

      localStorage.setItem(
        "careerai_result",
        JSON.stringify(response)
      );

      window.setTimeout(() => {
        document
          .getElementById("assessment-results")
          ?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
      }, 100);
    } catch (requestError) {
      console.error("Prediction request failed:", requestError);

      setError(
        "Unable to connect to CareerAI. Please make sure the FastAPI backend is running on port 8000 and try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const resetAssessment = () => {
    setForm(initialForm);
    setResult(null);
    setError("");
    localStorage.removeItem("careerai_student");
    localStorage.removeItem("careerai_result");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const getRecommendations = () => {
    const recommendations: string[] = [];

    if (form.coding_skills < 7) {
      recommendations.push(
        "Strengthen coding and DSA skills through regular problem solving."
      );
    }

    if (form.communication_skills < 7) {
      recommendations.push(
        "Practice communication, technical explanations and mock interviews."
      );
    }

    if (form.aptitude_score < 70) {
      recommendations.push(
        "Improve quantitative, logical and verbal aptitude with timed practice."
      );
    }

    if (form.internships === 0) {
      recommendations.push(
        "Gain practical experience through an internship, freelance work or a real-world project."
      );
    }

    if (form.projects < 2) {
      recommendations.push(
        "Build at least one more strong end-to-end project and publish it on GitHub."
      );
    }

    if (form.certifications < 2) {
      recommendations.push(
        "Consider completing relevant certifications that support your target role."
      );
    }

    if (form.backlogs > 0) {
      recommendations.push(
        "Prioritize clearing academic backlogs because eligibility can vary across companies."
      );
    }

    if (recommendations.length === 0) {
      recommendations.push(
        "Your current profile is well balanced. Keep strengthening DSA, projects and interview preparation."
      );
    }

    return recommendations;
  };

  const getSkillWidth = (value: number, maximum: number) =>
    `${Math.min(Math.max((value / maximum) * 100, 0), 100)}%`;

  return (
    <div className="career-page">
      <nav className="navbar">
        <Link to="/" className="brand">
          <div className="brand-icon">
            <Sparkles size={20} />
          </div>
          <span>CareerAI</span>
        </Link>

        <div className="nav-links">
          <span className="active">Assessment</span>
          <Link to="/dashboard">Dashboard</Link>
          <span>About</span>
        </div>
      </nav>

      <section className="hero">
        <div>
          <div className="eyebrow">
            <Brain size={16} />
            AI-POWERED CAREER ANALYSIS
          </div>

          <h1>
            Discover your<span> placement readiness.</span>
          </h1>

          <p>
            Analyze your academic, technical and professional profile using
            machine learning and receive actionable career insights.
          </p>
        </div>
      </section>

      <main className="content">
        <section className="assessment-card">
          <div className="section-heading">
            <div>
              <h2>Student Assessment</h2>
              <p>
                Enter your current academic, skill and experience information.
              </p>
            </div>

            <div className="step-badge">STEP 1 OF 1</div>
          </div>

          {error && (
            <div className="assessment-error" role="alert">
              <AlertCircle size={19} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-section">
              <div className="section-title">
                <GraduationCap size={19} />
                Academic Profile
              </div>

              <div className="form-grid">
                <div className="input-group">
                  <label htmlFor="age">Age</label>
                  <input
                    id="age"
                    type="number"
                    min="18"
                    max="60"
                    value={form.age}
                    onChange={(e) =>
                      updateNumber("age", e.target.value)
                    }
                    required
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="degree">Degree</label>
                  <input
                    id="degree"
                    type="text"
                    placeholder="e.g. B.Tech"
                    value={form.degree}
                    onChange={(e) =>
                      updateText("degree", e.target.value)
                    }
                    required
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="branch">Branch</label>
                  <input
                    id="branch"
                    type="text"
                    placeholder="e.g. CSE"
                    value={form.branch}
                    onChange={(e) =>
                      updateText("branch", e.target.value)
                    }
                    required
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="cgpa">CGPA</label>
                  <input
                    id="cgpa"
                    type="number"
                    step="0.01"
                    min="0"
                    max="10"
                    value={form.cgpa}
                    onChange={(e) =>
                      updateNumber("cgpa", e.target.value)
                    }
                    required
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="backlogs">Backlogs</label>
                  <input
                    id="backlogs"
                    type="number"
                    min="0"
                    value={form.backlogs}
                    onChange={(e) =>
                      updateNumber("backlogs", e.target.value)
                    }
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <div className="section-title">
                <Briefcase size={19} />
                Experience & Achievements
              </div>

              <div className="form-grid">
                <div className="input-group">
                  <label htmlFor="internships">Internships</label>
                  <input
                    id="internships"
                    type="number"
                    min="0"
                    value={form.internships}
                    onChange={(e) =>
                      updateNumber("internships", e.target.value)
                    }
                    required
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="certifications">Certifications</label>
                  <input
                    id="certifications"
                    type="number"
                    min="0"
                    value={form.certifications}
                    onChange={(e) =>
                      updateNumber("certifications", e.target.value)
                    }
                    required
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="projects">Projects</label>
                  <input
                    id="projects"
                    type="number"
                    min="0"
                    value={form.projects}
                    onChange={(e) =>
                      updateNumber("projects", e.target.value)
                    }
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <div className="section-title">
                <Code2 size={19} />
                Skills & Aptitude
              </div>

              <div className="form-grid">
                <div className="input-group">
                  <label htmlFor="coding">
                    Coding Skills (0-10)
                  </label>
                  <input
                    id="coding"
                    type="number"
                    min="0"
                    max="10"
                    step="0.1"
                    value={form.coding_skills}
                    onChange={(e) =>
                      updateNumber("coding_skills", e.target.value)
                    }
                    required
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="communication">
                    Communication (0-10)
                  </label>
                  <input
                    id="communication"
                    type="number"
                    min="0"
                    max="10"
                    step="0.1"
                    value={form.communication_skills}
                    onChange={(e) =>
                      updateNumber(
                        "communication_skills",
                        e.target.value
                      )
                    }
                    required
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="aptitude">
                    Aptitude Score (0-100)
                  </label>
                  <input
                    id="aptitude"
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    value={form.aptitude_score}
                    onChange={(e) =>
                      updateNumber("aptitude_score", e.target.value)
                    }
                    required
                  />
                </div>
              </div>
            </div>

            <div className="assessment-actions">
              <button
                className="predict-button"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="spin" size={19} />
                    Analyzing Profile...
                  </>
                ) : (
                  <>
                    <Target size={19} />
                    Predict Placement
                    <ArrowRight size={18} />
                  </>
                )}
              </button>

              <button
                className="reset-button"
                type="button"
                onClick={resetAssessment}
                disabled={loading}
              >
                <RotateCcw size={17} />
                Reset
              </button>
            </div>
          </form>
        </section>

        {result && (
          <section className="results" id="assessment-results">
            <div className="result-header">
              <div>
                <div className="eyebrow">
                  <Sparkles size={16} />
                  AI ANALYSIS COMPLETE
                </div>

                <h2>Your CareerAI Results</h2>

                <p>
                  Based on your academic profile, skills and experience.
                </p>
              </div>
            </div>

            <div className="result-grid">
              <div className="result-card probability-card">
                <div className="card-label">
                  PLACEMENT PROBABILITY
                </div>

                <div className="probability">
                  {result.placement_probability}%
                </div>

                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${result.placement_probability}%`,
                    }}
                  />
                </div>

                <div className="status">
                  {result.prediction === 1 ? (
                    <CheckCircle2 size={20} />
                  ) : (
                    <AlertCircle size={20} />
                  )}
                  <strong>{result.status}</strong>
                </div>

                <p className="result-note">
                  This is a model-based estimate, not a guarantee of placement.
                </p>
              </div>

              <div className="result-card">
                <div className="card-label">STUDENT PROFILE</div>

                <div className="profile-grid">
                  <div>
                    <span>CGPA</span>
                    <strong>{form.cgpa}</strong>
                  </div>

                  <div>
                    <span>Branch</span>
                    <strong>{form.branch}</strong>
                  </div>

                  <div>
                    <span>Internships</span>
                    <strong>{form.internships}</strong>
                  </div>

                  <div>
                    <span>Projects</span>
                    <strong>{form.projects}</strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="result-card skills-card">
              <div className="card-label">SKILL READINESS</div>

              <div className="skill-row">
                <div className="skill-info">
                  <span>
                    <Code2 size={17} />
                    Coding
                  </span>
                  <strong>{form.coding_skills}/10</strong>
                </div>

                <div className="skill-track">
                  <div
                    style={{
                      width: getSkillWidth(form.coding_skills, 10),
                    }}
                  />
                </div>
              </div>

              <div className="skill-row">
                <div className="skill-info">
                  <span>
                    <MessageSquare size={17} />
                    Communication
                  </span>
                  <strong>{form.communication_skills}/10</strong>
                </div>

                <div className="skill-track">
                  <div
                    style={{
                      width: getSkillWidth(
                        form.communication_skills,
                        10
                      ),
                    }}
                  />
                </div>
              </div>

              <div className="skill-row">
                <div className="skill-info">
                  <span>
                    <Brain size={17} />
                    Aptitude
                  </span>
                  <strong>{form.aptitude_score}/100</strong>
                </div>

                <div className="skill-track">
                  <div
                    style={{
                      width: getSkillWidth(
                        form.aptitude_score,
                        100
                      ),
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="result-card recommendation-card">
              <div className="card-label">
                <Sparkles size={17} />
                PERSONALIZED RECOMMENDATIONS
              </div>

              {getRecommendations().map((recommendation, index) => (
                <div className="recommendation" key={index}>
                  <Award size={18} />
                  <span>{recommendation}</span>
                </div>
              ))}
            </div>

            <div className="dashboard-link-container">
              <Link
                to="/dashboard"
                className="dashboard-result-button"
              >
                <Target size={18} />
                View Full Dashboard
                <ArrowRight size={18} />
              </Link>
            </div>
          </section>
        )}
      </main>

      <footer>
        <Sparkles size={15} />
        CareerAI · AI-powered student placement analysis
      </footer>
    </div>
  );
}

export default Assessment;
