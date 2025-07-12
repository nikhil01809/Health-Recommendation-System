from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import pandas as pd
import numpy as np

app = Flask(__name__)
CORS(app)

# Load model and datasets
with open("models/model.pkl", "rb") as f:
    model = pickle.load(f)

# Load CSV files and standardize column names
def load_csv(filepath):
    try:
        df = pd.read_csv(filepath, encoding="utf-8")
        df.columns = df.columns.str.strip().str.lower()  # Normalize column names to lowercase
        print(f"Loaded {filepath} with columns: {df.columns.tolist()}")  # Debugging output
        print(df.head())  # Print first few rows for debugging
        return df
    except Exception as e:
        print(f"Error loading {filepath}: {e}")
        return pd.DataFrame()  # Return empty DataFrame on failure

description = load_csv("data/description.csv")
precautions = load_csv("data/precautions_df.csv")
medications = load_csv("data/medications.csv")
diets = load_csv("data/diets.csv")
workout = load_csv("data/workout_df.csv")

# Mapping of predicted integer values to disease names
diseases_list = {
    15: 'Fungal infection', 4: 'Allergy', 16: 'GERD', 9: 'Chronic cholestasis', 
    14: 'Drug Reaction', 33: 'Peptic ulcer disease', 1: 'AIDS', 12: 'Diabetes', 
    17: 'Gastroenteritis', 6: 'Bronchial Asthma', 23: 'Hypertension', 30: 'Migraine', 
    7: 'Cervical spondylosis', 32: 'Paralysis (brain hemorrhage)', 28: 'Jaundice', 
    29: 'Malaria', 8: 'Chicken pox', 11: 'Dengue', 37: 'Typhoid', 40: 'hepatitis A', 
    19: 'Hepatitis B', 20: 'Hepatitis C', 21: 'Hepatitis D', 22: 'Hepatitis E', 
    3: 'Alcoholic hepatitis', 36: 'Tuberculosis', 10: 'Common Cold', 34: 'Pneumonia', 
    13: 'Dimorphic hemorrhoids(piles)', 18: 'Heart attack', 39: 'Varicose veins', 
    26: 'Hypothyroidism', 24: 'Hyperthyroidism', 25: 'Hypoglycemia', 31: 'Osteoarthritis', 
    5: 'Arthritis', 0: '(vertigo) Paroxysmal Positional Vertigo', 2: 'Acne', 
    38: 'Urinary tract infection', 35: 'Psoriasis', 27: 'Impetigo'
}

def get_predicted_value(symptoms):
    try:
        input_data = np.array(symptoms).reshape(1, -1)
        print(f"Model Input Data: {input_data}")  # Debugging output
        prediction = model.predict(input_data)[0]
        print(f"Predicted Disease ID: {prediction}")  # Debugging output
        return prediction
    except Exception as e:
        print(f"Error in get_predicted_value: {e}")
        return None

def helper(disease):
    try:
        disease = disease.strip().lower()  # Ensure matching is case insensitive
        
        if "disease" not in description.columns:
            print("Error: 'disease' column not found in description dataset.")
            return "No description available", [], [], [], []

        desc = description[description["disease"].str.strip().str.lower() == disease]["description"].values
        pre_df = precautions[precautions["disease"].str.strip().str.lower() == disease]
        med = medications[medications["disease"].str.strip().str.lower() == disease]["medication"].tolist()
        diet = diets[diets["disease"].str.strip().str.lower() == disease]["diet"].tolist()
        wrkout = workout[workout["disease"].str.strip().str.lower() == disease]["workout"].tolist()
        
        if pre_df.empty:
            print(f"Warning: No precautions found for {disease}")
            pre = []
        else:
            pre = pre_df.drop(["disease", "unnamed: 0"], axis=1, errors='ignore').values.tolist()[0]
        
        return desc[0] if len(desc) > 0 else "No description available", pre, med, diet, wrkout
    except Exception as e:
        print(f"Error in helper function: {e}")
        return "No description available", [], [], [], []

@app.route("/api/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()
        symptoms = data.get("symptoms", [])

        if not symptoms:
            return jsonify({"error": "No symptoms provided"}), 400

        predicted_disease_id = get_predicted_value(symptoms)

        if predicted_disease_id is None:
            return jsonify({"error": "Model prediction failed"}), 500

        predicted_disease = diseases_list.get(predicted_disease_id, "Unknown Disease")
        
        desc, pre, med, diet, wrkout = helper(predicted_disease)

        return jsonify({
            "disease": predicted_disease,
            "description": desc,
            "precautions": pre,
            "medications": med,
            "diets": diet,
            "workout": wrkout
        })

    except Exception as e:
        print(f"Error in predict endpoint: {e}")
        return jsonify({"error": "Internal server error"}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5001)  # Running Flask on port 5001