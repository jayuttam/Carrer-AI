import os
import joblib
import pandas as pd


MODEL_PATH = os.path.join(
    os.path.dirname(os.path.dirname(os.path.dirname(__file__))),
    "ml",
    "final_placement_model.joblib"
)


# Load model once when the application starts
model = joblib.load(MODEL_PATH)


def predict_placement(student_data: dict):

    # Convert input dictionary to DataFrame
    input_df = pd.DataFrame([student_data])

    # Prediction
    prediction = model.predict(input_df)[0]

    # Probability
    probabilities = model.predict_proba(input_df)[0]
    placement_probability = float(probabilities[1])

    status = "Likely Placed" if prediction == 1 else "Needs Improvement"

    return {
        "prediction": int(prediction),
        "status": status,
        "placement_probability": round(
            placement_probability * 100, 2
        )
    }