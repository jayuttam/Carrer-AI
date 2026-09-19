import { useEffect, useState, type ReactNode } from "react";
import {
  ArrowLeft,
  Award,
  Brain,
  Briefcase,
  CheckCircle2,
  Code2,
  GraduationCap,
  Lightbulb,
  MessageSquare,
  Sparkles,
  Target,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";
import "./Dashboard.css";

import {
  getRecommendations,
  type RecommendationResponse,
} from "../services/api";

interface StudentData {
  age: number;
  degree: string;
  branch: string;
  cgpa: number;
  backlogs: number;
  internships: number;
  certifications: number;
  coding_skills: number;
  communication_skills: number;
  aptitude_score: number;
  projects: number;
}

interface PredictionData {
  prediction: number;
  status: string;
  placement_probability: number;
}

function Skill({
  icon,
  name,
  value,
  max,
  suffix = "",
}: {
  icon: ReactNode;
  name: string;
  value: number;
  max: number;
  suffix?: string;
}) {
  const percentage = Math.min((value / max) * 100, 100);

  return (
    <div className="dashboard-skill">
      <div className="skill-heading">
        <span className="skill-name">
          <span className="skill-icon">{icon}</span>
          {name}
        </span>

        <strong>
          {value}
          {suffix}
        </strong>
      </div>

      <div className="skill-track">
        <div
          className="skill-fill"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

function Achievement({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string | number;
}) {
  return (
    <div className="achievement-card">
      <div className="achievement-icon">{icon}</div>

      <div>
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
    </div>
  );
}

function Insight({
  icon,
  title,
  text,
}: {
  icon: ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="insight-card">
      <div className="insight-icon">{icon}</div>

      <div>
        <h4>{title}</h4>
        <p>{text}</p>
      </div>
    </div>
  );
}

function getStrengths(student: StudentData): string[] {
  const strengths: string[] = [];

  if (student.coding_skills >= 8) {
    strengths.push("Strong coding skills");
  }

  if (student.communication_skills >= 8) {
    strengths.push("Strong communication skills");
  }

  if (student.aptitude_score >= 80) {
    strengths.push("Strong aptitude performance");
  }

  if (student.cgpa >= 8) {
    strengths.push("Good academic performance");
  }

  if (student.internships >= 1) {
    strengths.push("Practical internship experience");
  }

  if (student.projects >= 2) {
    strengths.push("Good project exposure");
  }

  if (student.certifications >= 2) {
    strengths.push("Good certification profile");
  }

  if (student.backlogs === 0) {
    strengths.push("No academic backlogs");
  }

  if (strengths.length === 0) {
    strengths.push(
      "Your profile provides a foundation that can be developed further"
    );
  }

  return strengths.slice(0, 5);
}

function getImprovements(student: StudentData): string[] {
  const improvements: string[] = [];

  if (student.coding_skills < 7) {
    improvements.push("Improve coding and problem-solving skills");
  }

  if (student.communication_skills < 7) {
    improvements.push("Improve communication and interview skills");
  }

  if (student.aptitude_score < 70) {
    improvements.push("Practice quantitative and logical aptitude");
  }

  if (student.projects < 2) {
    improvements.push("Build more practical software projects");
  }

  if (student.internships === 0) {
    improvements.push("Gain practical experience through internships");
  }

  if (student.certifications < 2) {
    improvements.push("Add relevant technical certifications");
  }

  if (student.cgpa < 7) {
    improvements.push("Focus on improving academic performance");
  }

  if (student.backlogs > 0) {
    improvements.push("Clear remaining academic backlogs");
  }

  if (improvements.length === 0) {
    improvements.push(
      "Continue strengthening your technical skills and practical experience"
    );
  }

  return improvements.slice(0, 5);
}

function Dashboard() {
  const savedStudent = localStorage.getItem("careerai_student");
  const savedResult = localStorage.getItem("careerai_result");

  const student: StudentData | null = savedStudent
    ? JSON.parse(savedStudent)
    : null;

  const result: PredictionData | null = savedResult
    ? JSON.parse(savedResult)
    : null;

  const [recommendations, setRecommendations] =
    useState<RecommendationResponse | null>(null);

  const [recommendationError, setRecommendationError] =
    useState(false);

  // Load backend recommendations
  useEffect(() => {
    if (!student) {
      return;
    }

    const loadRecommendations = async () => {
      try {
        setRecommendationError(false);

        const data = await getRecommendations(student);

        setRecommendations(data);
      } catch (error) {
        console.error(
          "Failed to load career recommendations:",
          error
        );

        setRecommendationError(true);
      }
    };

    loadRecommendations();
  }, [savedStudent]);

  // No assessment found
  if (!student || !result) {
    return (
      <div className="dashboard-empty">
        <div className="empty-card">
          <div className="empty-icon">
            <Brain size={34} />
          </div>

          <h1>No Assessment Found</h1>

          <p>
            Complete your CareerAI assessment first to generate your
            personalized dashboard.
          </p>

          <Link to="/" className="primary-dashboard-btn">
            Start Assessment
          </Link>
        </div>
      </div>
    );
  }

  const strengths = getStrengths(student);
  const improvements = getImprovements(student);

  return (
    <div className="dashboard-page">
      {/* NAVBAR */}
      <nav className="dashboard-navbar">
        <Link to="/" className="dashboard-brand">
          <span className="brand-mark">
            <Brain size={20} />
          </span>

          <span>
            Career<span>AI</span>
          </span>
        </Link>

        <Link to="/" className="back-link">
          <ArrowLeft size={17} />
          New Assessment
        </Link>
      </nav>

      <main className="dashboard-container">
        {/* HEADER */}
        <section className="dashboard-header">
          <div>
            <div className="eyebrow">
              <Sparkles size={15} />
              Personalized Career Dashboard
            </div>

            <h1>
              Your CareerAI <span>Insights</span>
            </h1>

            <p>
              A snapshot of your placement readiness based on your
              assessment.
            </p>
          </div>

          <div className="placement-card">
            <div className="placement-ring">
              <strong>{result.placement_probability}%</strong>
              <span>Probability</span>
            </div>

            <div>
              <span className="placement-label">
                Placement Prediction
              </span>

              <h3>{result.status}</h3>
            </div>
          </div>
        </section>

        {/* PROFILE + SKILLS */}
        <section className="dashboard-grid">
          <div className="dashboard-card profile-card">
            <div className="section-title">
              <GraduationCap size={20} />

              <div>
                <h2>Student Profile</h2>
                <p>Your academic information</p>
              </div>
            </div>

            <div className="profile-details">
              <div>
                <span>Degree</span>
                <strong>{student.degree}</strong>
              </div>

              <div>
                <span>Branch</span>
                <strong>{student.branch}</strong>
              </div>

              <div>
                <span>Age</span>
                <strong>{student.age}</strong>
              </div>

              <div>
                <span>CGPA</span>
                <strong>{student.cgpa}/10</strong>
              </div>

              <div>
                <span>Backlogs</span>
                <strong>{student.backlogs}</strong>
              </div>
            </div>
          </div>

          <div className="dashboard-card skills-card">
            <div className="section-title">
              <Target size={20} />

              <div>
                <h2>Skill Analysis</h2>
                <p>Your assessed skill levels</p>
              </div>
            </div>

            <Skill
              icon={<Code2 size={17} />}
              name="Coding Skills"
              value={student.coding_skills}
              max={10}
              suffix="/10"
            />

            <Skill
              icon={<MessageSquare size={17} />}
              name="Communication"
              value={student.communication_skills}
              max={10}
              suffix="/10"
            />

            <Skill
              icon={<Target size={17} />}
              name="Aptitude"
              value={student.aptitude_score}
              max={100}
              suffix="/100"
            />
          </div>
        </section>

        {/* EXPERIENCE */}
        <section className="dashboard-card">
          <div className="section-title">
            <Award size={20} />

            <div>
              <h2>Experience & Achievements</h2>

              <p>
                Activities that strengthen your placement profile
              </p>
            </div>
          </div>

          <div className="achievement-grid">
            <Achievement
              icon={<Briefcase size={21} />}
              label="Internships"
              value={student.internships}
            />

            <Achievement
              icon={<Award size={21} />}
              label="Certifications"
              value={student.certifications}
            />

            <Achievement
              icon={<Code2 size={21} />}
              label="Projects"
              value={student.projects}
            />
          </div>
        </section>

        {/* STRENGTHS */}
        <section className="dashboard-card">
          <div className="section-title">
            <CheckCircle2 size={20} />

            <div>
              <h2>Your Strengths</h2>
              <p>
                Positive signals identified from your assessment
              </p>
            </div>
          </div>

          <div className="insight-grid">
            {strengths.map((strength, index) => (
              <Insight
                key={index}
                icon={<CheckCircle2 size={20} />}
                title="Strength"
                text={strength}
              />
            ))}
          </div>
        </section>

        {/* IMPROVEMENT AREAS */}
        <section className="dashboard-card">
          <div className="section-title">
            <TrendingUp size={20} />

            <div>
              <h2>Improvement Areas</h2>
              <p>
                Skills and profile areas you can work on next
              </p>
            </div>
          </div>

          <div className="insight-grid">
            {improvements.map((improvement, index) => (
              <Insight
                key={index}
                icon={<TrendingUp size={20} />}
                title="Focus Area"
                text={improvement}
              />
            ))}
          </div>
        </section>

        {/* BACKEND CAREER RECOMMENDATIONS */}
        <section className="dashboard-card">
          <div className="section-title">
            <Briefcase size={20} />

            <div>
              <h2>Career Recommendations</h2>

              <p>
                Career directions generated by the CareerAI
                recommendation engine
              </p>
            </div>
          </div>

          {recommendationError ? (
            <div className="insight-grid">
              <Insight
                icon={<Briefcase size={20} />}
                title="Recommendation Service"
                text="Unable to load recommendations. Make sure the FastAPI backend is running."
              />
            </div>
          ) : !recommendations ? (
            <div className="insight-grid">
              <Insight
                icon={<Sparkles size={20} />}
                title="Generating Recommendations"
                text="CareerAI is analyzing your profile..."
              />
            </div>
          ) : (
            <div className="insight-grid">
              {recommendations.career_roles.map((career, index) => (
                <Insight
                  key={index}
                  icon={<Briefcase size={20} />}
                  title="Recommended Role"
                  text={career}
                />
              ))}
            </div>
          )}
        </section>

        {/* SKILL GAP ANALYSIS */}
        <section className="dashboard-card">
          <div className="section-title">
            <Target size={20} />

            <div>
              <h2>Skill Gap Analysis</h2>

              <p>
                Compare your current profile with recommended
                placement readiness levels
              </p>
            </div>
          </div>

          {recommendations && (
            <div className="insight-grid">
              {recommendations.skill_gaps.map((gap, index) => (
                <Insight
                  key={index}
                  icon={
                    gap.gap === 0 ? (
                      <CheckCircle2 size={20} />
                    ) : (
                      <TrendingUp size={20} />
                    )
                  }
                  title={`${gap.skill} • Gap: ${gap.gap}`}
                  text={`${gap.recommendation} Current: ${gap.current} | Required: ${gap.required}`}
                />
              ))}
            </div>
          )}
        </section>

        {/* LEARNING RECOMMENDATIONS */}
        <section className="dashboard-card">
          <div className="section-title">
            <Lightbulb size={20} />

            <div>
              <h2>Personalized Learning Plan</h2>

              <p>
                Recommended areas to focus on based on your current
                profile
              </p>
            </div>
          </div>

          {recommendations && (
            <div className="insight-grid">
              {recommendations.learning_recommendations.map(
                (recommendation, index) => (
                  <Insight
                    key={index}
                    icon={<Lightbulb size={20} />}
                    title={`Recommendation ${index + 1}`}
                    text={recommendation}
                  />
                )
              )}
            </div>
          )}
        </section>

        {/* CAREER INSIGHTS */}
        <section className="dashboard-card">
          <div className="section-title">
            <Sparkles size={20} />

            <div>
              <h2>Career Insights</h2>
              <p>Actionable observations from your assessment</p>
            </div>
          </div>

          <div className="insight-grid">
            <Insight
              icon={<Target size={20} />}
              title="Placement Readiness"
              text={
                result.prediction === 1
                  ? "Your current profile received a positive placement prediction from the trained placement model."
                  : "Your current profile has areas that can be improved to strengthen placement readiness."
              }
            />

            <Insight
              icon={<Code2 size={20} />}
              title="Technical Growth"
              text={
                student.coding_skills >= 7
                  ? "Your coding score is currently one of the stronger parts of your profile. Continue practicing DSA and project development."
                  : "Strengthening coding, DSA, and practical development skills should be a major focus."
              }
            />

            <Insight
              icon={<MessageSquare size={20} />}
              title="Communication"
              text={
                student.communication_skills >= 7
                  ? "Your communication score provides a good foundation for technical interviews and professional interaction."
                  : "Communication and interview practice should be included in your preparation plan."
              }
            />

            <Insight
              icon={<Lightbulb size={20} />}
              title="Project Development"
              text={
                student.projects >= 2
                  ? "Your project count provides useful practical exposure. Focus on making your projects production-ready and interview-ready."
                  : "Building more practical projects can help demonstrate your development skills during placements."
              }
            />
          </div>
        </section>

        {/* BOTTOM ACTION */}
        <div className="dashboard-bottom-action">
          <Link to="/" className="secondary-dashboard-btn">
            <ArrowLeft size={17} />
            Retake Assessment
          </Link>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;