from typing import Any


def calculate_skill_gaps(student: dict[str, Any]) -> list[dict[str, Any]]:
    """
    Calculate skill gaps from the student's assessment data.
    This is a rule-based recommendation layer.
    It does NOT modify or retrain the ML model.
    """

    gaps = []

    # -----------------------------
    # Coding
    # -----------------------------
    coding = float(student.get("coding_skills", 0))

    coding_required = 8
    coding_gap = max(coding_required - coding, 0)

    gaps.append(
        {
            "skill": "Coding",
            "current": coding,
            "required": coding_required,
            "gap": round(coding_gap, 1),
            "recommendation": (
                "Continue advanced DSA and problem solving."
                if coding_gap == 0
                else "Practice programming fundamentals, DSA and coding problems."
            ),
        }
    )

    # -----------------------------
    # Communication
    # -----------------------------
    communication = float(
        student.get("communication_skills", 0)
    )

    communication_required = 8
    communication_gap = max(
        communication_required - communication,
        0,
    )

    gaps.append(
        {
            "skill": "Communication",
            "current": communication,
            "required": communication_required,
            "gap": round(communication_gap, 1),
            "recommendation": (
                "Continue interview and presentation practice."
                if communication_gap == 0
                else "Practice spoken English, technical explanations and mock interviews."
            ),
        }
    )

    # -----------------------------
    # Aptitude
    # -----------------------------
    aptitude = float(
        student.get("aptitude_score", 0)
    )

    aptitude_required = 80
    aptitude_gap = max(
        aptitude_required - aptitude,
        0,
    )

    gaps.append(
        {
            "skill": "Aptitude",
            "current": aptitude,
            "required": aptitude_required,
            "gap": round(aptitude_gap, 1),
            "recommendation": (
                "Maintain your aptitude preparation."
                if aptitude_gap == 0
                else "Practice quantitative aptitude, logical reasoning and verbal ability."
            ),
        }
    )

    # -----------------------------
    # Projects
    # -----------------------------
    projects = int(student.get("projects", 0))

    projects_required = 3
    projects_gap = max(
        projects_required - projects,
        0,
    )

    gaps.append(
        {
            "skill": "Projects",
            "current": projects,
            "required": projects_required,
            "gap": projects_gap,
            "recommendation": (
                "Focus on making your existing projects production-ready."
                if projects_gap == 0
                else "Build practical full-stack or AI/ML projects for your portfolio."
            ),
        }
    )

    # -----------------------------
    # Internship Experience
    # -----------------------------
    internships = int(
        student.get("internships", 0)
    )

    internships_required = 1
    internships_gap = max(
        internships_required - internships,
        0,
    )

    gaps.append(
        {
            "skill": "Internship Experience",
            "current": internships,
            "required": internships_required,
            "gap": internships_gap,
            "recommendation": (
                "Continue building practical industry experience."
                if internships_gap == 0
                else "Look for internships, open-source work or real-world projects."
            ),
        }
    )

    # -----------------------------
    # Certifications
    # -----------------------------
    certifications = int(
        student.get("certifications", 0)
    )

    certifications_required = 2
    certifications_gap = max(
        certifications_required - certifications,
        0,
    )

    gaps.append(
        {
            "skill": "Certifications",
            "current": certifications,
            "required": certifications_required,
            "gap": certifications_gap,
            "recommendation": (
                "Maintain relevant technical certifications."
                if certifications_gap == 0
                else "Complete certifications relevant to your target technology stack."
            ),
        }
    )

    return gaps


def get_career_roles(student: dict[str, Any]) -> list[str]:
    """
    Generate potential career directions using rule-based logic.
    These are recommendations, NOT ML predictions.
    """

    coding = float(student.get("coding_skills", 0))
    communication = float(
        student.get("communication_skills", 0)
    )
    aptitude = float(student.get("aptitude_score", 0))
    projects = int(student.get("projects", 0))

    roles = []

    if coding >= 7 and projects >= 2:
        roles.append("Software Developer")

    if coding >= 7 and projects >= 1:
        roles.append("Full Stack Developer")

    if coding >= 7:
        roles.append("Backend Developer")

    if aptitude >= 75 and coding >= 6:
        roles.append("Data / Software Engineer")

    if communication >= 8 and aptitude >= 70:
        roles.append("Technology Analyst")

    if not roles:
        roles = [
            "Software Developer",
            "Web Developer",
            "Data Analyst",
        ]

    return list(dict.fromkeys(roles))


def get_learning_recommendations(
    student: dict[str, Any],
) -> list[str]:
    """
    Generate learning recommendations based on detected gaps.
    """

    recommendations = []

    coding = float(student.get("coding_skills", 0))
    communication = float(
        student.get("communication_skills", 0)
    )
    aptitude = float(student.get("aptitude_score", 0))
    projects = int(student.get("projects", 0))
    internships = int(student.get("internships", 0))

    if coding < 7:
        recommendations.append(
            "Strengthen programming fundamentals and DSA."
        )
    else:
        recommendations.append(
            "Continue advanced DSA and interview problem solving."
        )

    if communication < 7:
        recommendations.append(
            "Practice spoken English and technical interview communication."
        )

    if aptitude < 75:
        recommendations.append(
            "Practice quantitative aptitude and logical reasoning."
        )

    if projects < 2:
        recommendations.append(
            "Build at least one strong end-to-end software project."
        )

    if internships == 0:
        recommendations.append(
            "Gain practical experience through internships, freelancing or open-source contributions."
        )

    recommendations.append(
        "Strengthen SQL and database fundamentals."
    )

    return list(dict.fromkeys(recommendations))


def generate_recommendations(
    student: dict[str, Any],
) -> dict[str, Any]:
    """
    Main function used by the FastAPI recommendation route.
    """

    skill_gaps = calculate_skill_gaps(student)

    career_roles = get_career_roles(student)

    learning_recommendations = get_learning_recommendations(
        student
    )

    return {
        "skill_gaps": skill_gaps,
        "career_roles": career_roles,
        "learning_recommendations": learning_recommendations,
    }