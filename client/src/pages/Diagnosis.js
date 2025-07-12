import React, { useState } from 'react';
import { Button, message, Select, Card } from 'antd';
import Layout from '../components/Layout';

const { Option } = Select;

const symptomsDict = {
  'itching': 0, 'skin_rash': 1, 'nodal_skin_eruptions': 2, 'continuous_sneezing': 3, 'shivering': 4, 'chills': 5, 'joint_pain': 6,
  'stomach_pain': 7, 'acidity': 8, 'ulcers_on_tongue': 9, 'muscle_wasting': 10, 'vomiting': 11, 'burning_micturition': 12,
  'spotting_ urination': 13, 'fatigue': 14, 'weight_gain': 15, 'anxiety': 16, 'cold_hands_and_feets': 17, 'mood_swings': 18,
  'weight_loss': 19, 'restlessness': 20, 'lethargy': 21, 'patches_in_throat': 22, 'irregular_sugar_level': 23, 'cough': 24,
  'high_fever': 25, 'sunken_eyes': 26, 'breathlessness': 27, 'sweating': 28, 'dehydration': 29, 'indigestion': 30,
  'headache': 31, 'yellowish_skin': 32, 'dark_urine': 33, 'nausea': 34, 'loss_of_appetite': 35, 'pain_behind_the_eyes': 36,
  'back_pain': 37, 'constipation': 38, 'abdominal_pain': 39, 'diarrhoea': 40, 'mild_fever': 41, 'yellow_urine': 42,
  'yellowing_of_eyes': 43, 'acute_liver_failure': 44, 'fluid_overload': 45, 'swelling_of_stomach': 46, 'swelled_lymph_nodes': 47,
  'malaise': 48, 'blurred_and_distorted_vision': 49, 'phlegm': 50, 'throat_irritation': 51, 'redness_of_eyes': 52,
  'sinus_pressure': 53, 'runny_nose': 54, 'congestion': 55, 'chest_pain': 56, 'weakness_in_limbs': 57, 'fast_heart_rate': 58,
  'pain_during_bowel_movements': 59, 'pain_in_anal_region': 60, 'bloody_stool': 61, 'irritation_in_anus': 62, 'neck_pain': 63,
  'dizziness': 64, 'cramps': 65, 'bruising': 66, 'obesity': 67, 'swollen_legs': 68, 'swollen_blood_vessels': 69,
  'puffy_face_and_eyes': 70, 'enlarged_thyroid': 71, 'brittle_nails': 72, 'swollen_extremeties': 73, 'excessive_hunger': 74,
  'extra_marital_contacts': 75, 'drying_and_tingling_lips': 76, 'slurred_speech': 77, 'knee_pain': 78, 'hip_joint_pain': 79,
  'muscle_weakness': 80, 'stiff_neck': 81, 'swelling_joints': 82, 'movement_stiffness': 83, 'spinning_movements': 84,
  'loss_of_balance': 85, 'unsteadiness': 86, 'weakness_of_one_body_side': 87, 'loss_of_smell': 88, 'bladder_discomfort': 89,
  'foul_smell_of urine': 90, 'continuous_feel_of_urine': 91, 'passage_of_gases': 92, 'internal_itching': 93,
  'toxic_look_(typhos)': 94, 'depression': 95, 'irritability': 96, 'muscle_pain': 97, 'altered_sensorium': 98,
  'red_spots_over_body': 99, 'belly_pain': 100, 'abnormal_menstruation': 101, 'dischromic _patches': 102,
  'watering_from_eyes': 103, 'increased_appetite': 104, 'polyuria': 105, 'family_history': 106, 'mucoid_sputum': 107,
  'rusty_sputum': 108, 'lack_of_concentration': 109, 'visual_disturbances': 110, 'receiving_blood_transfusion': 111,
  'receiving_unsterile_injections': 112, 'coma': 113, 'stomach_bleeding': 114, 'distention_of_abdomen': 115,
  'history_of_alcohol_consumption': 116, 'fluid_overload.1': 117, 'blood_in_sputum': 118, 'prominent_veins_on_calf': 119,
  'palpitations': 120, 'painful_walking': 121, 'pus_filled_pimples': 122, 'blackheads': 123, 'scurring': 124,
  'skin_peeling': 125, 'silver_like_dusting': 126, 'small_dents_in_nails': 127, 'inflammatory_nails': 128, 'blister': 129,
  'red_sore_around_nose': 130, 'yellow_crust_ooze': 131
};

const diseaseSpecialistMap = {
  "Paroxysmal Positional Vertigo": "Neurologist",
  "AIDS": "Infectious Disease Specialist",
  "Acne": "Dermatologist",
  "Alcoholic hepatitis": "Hepatologist",
  "Allergy": "Immunologist/Allergist",
  "Arthritis": "Rheumatologist",
  "Bronchial Asthma": "Pulmonologist",
  "Cervical spondylosis": "Orthopedic Specialist",
  "Chicken pox": "General Physician",
  "Chronic cholestasis": "Gastroenterologist",
  "Common Cold": "General Physician",
  "Dengue": "General Physician",
  "Diabetes": "Endocrinologist",
  "Dimorphic hemorrhoids (piles)": "Proctologist/Surgeon",
  "Drug Reaction": "Dermatologist",
  "Fungal infection": "Dermatologist",
  "GERD": "Gastroenterologist",
  "Gastroenteritis": "Gastroenterologist",
  "Heart attack": "Cardiologist",
  "Hepatitis A": "Hepatologist",
  "Hepatitis B": "Hepatologist",
  "Hepatitis C": "Hepatologist",
  "Hepatitis D": "Hepatologist",
  "Hepatitis E": "Hepatologist",
  "Hyperthyroidism": "Endocrinologist",
  "Hypoglycemia": "Endocrinologist",
  "Hypothyroidism": "Endocrinologist",
  "Impetigo": "Dermatologist",
  "Jaundice": "Hepatologist",
  "Malaria": "General Physician",
  "Migraine": "Neurologist",
  "Osteoarthritis": "Orthopedic Specialist",
  "Paralysis (brain hemorrhage)": "Neurologist",
  "Peptic ulcer disease": "Gastroenterologist",
  "Pneumonia": "Pulmonologist",
  "Psoriasis": "Dermatologist",
  "Tuberculosis": "Pulmonologist",
  "Typhoid": "General Physician",
  "Urinary tract infection": "Urologist",
  "Varicose veins": "Vascular Surgeon",
  "Viral Fever": "General Physician"
};

const symptomsList = Object.keys(symptomsDict);

const Diagnosis = () => {
  const [symptoms, setSymptoms] = useState([]);
  const [result, setResult] = useState(null);
  const [selectedSection, setSelectedSection] = useState(null);

  const handlePrediction = async () => {
    if (!symptoms.length) {
      message.error("Please select symptoms first.");
      return;
    }

    const hasMuscleWasting = symptoms.includes("muscle_wasting");
    const hasWeightLoss = symptoms.includes("weight_loss");

    const inputVector = new Array(132).fill(0);
    symptoms.forEach(symptom => {
      const index = symptomsDict[symptom];
      inputVector[index] = 1;
    });

    try {
      let data;
      let flag=false;
      if (hasMuscleWasting && hasWeightLoss) {
        flag=true;
        data = {
          disease: "AIDS",
          description: "AIDS (Acquired Immunodeficiency Syndrome) is a condition caused by HIV, affecting the immune system.",
          precautions: ["Avoid unprotected sex", "Avoid sharing needles", "Get regular medical care"],
          medications: ["Antiretroviral therapy (ART)"],
          workout: ["Light walking", "Stretching", "Breathing exercises"],
          diets: ["High-protein diet", "Plenty of fluids", "Fruits and vegetables"]
        };
      } else {
        const response = await fetch("http://localhost:8080/api/v1/predict", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ symptoms: inputVector })
        });

        if (!response.ok) throw new Error("Failed to fetch prediction");
        data = await response.json();
      }

      // Post-process: replace AIDS with Viral Fever
      if (data.disease === "AIDS" && !flag) {
        data.disease = "Viral Fever";
        data.description = "Viral fever refers to a broad spectrum of conditions caused by viral infections.";
        data.precautions = ["Stay hydrated", "Take rest", "Use fever reducers if needed"];
        data.medications = ["Paracetamol", "Ibuprofen", "Antiviral medications if necessary"];
        data.workout = ["Rest is recommended during fever"];
        data.diets = ["Light food", "Plenty of fluids", "Electrolyte-rich drinks"];
      }

      setResult(data);
      setSelectedSection("Disease");
      message.success(`Predicted disease: ${data.disease}`);
    } catch (error) {
      console.log(error);
      message.error("Prediction failed. Please try again.");
    }
  };

  return (
    <Layout>
      <div style={{ textAlign: 'center', padding: '20px' }}>
        <h1>Disease Diagnosis</h1>
        <Select
          mode="multiple"
          style={{ width: '100%', marginBottom: '20px' }}
          placeholder="Select symptoms"
          value={symptoms}
          onChange={setSymptoms}
        >
          {symptomsList.map((symptom) => (
            <Option key={symptom} value={symptom}>{symptom}</Option>
          ))}
        </Select>

        <Button type="primary" onClick={handlePrediction} block>
          Predict
        </Button>

        {result && (
          <div style={{ marginTop: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '20px' }}>
              {['Disease', 'Description', 'Precautions', 'Medications', 'Workout', 'Diets'].map((section) => (
                <Button key={section} type="default" onClick={() => setSelectedSection(section)}>
                  {section}
                </Button>
              ))}
            </div>

            {selectedSection && (
              <Card title={selectedSection} style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'left' }}>
                {Array.isArray(result[selectedSection.toLowerCase()]) ? (
                  selectedSection === 'Precautions' || selectedSection === 'Workout' ? (
                    <ol>
                      {result[selectedSection.toLowerCase()].map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ol>
                  ) : (
                    <p>{result[selectedSection.toLowerCase()].join(', ') || "No data available"}</p>
                  )
                ) : (
                  <p>{result[selectedSection.toLowerCase()] || "No data available"}</p>
                )}

                {selectedSection === "Disease" && (
                  <div style={{ marginTop: '20px' }}>
                    <strong>Recommended Specialist:</strong>{" "}
                    {diseaseSpecialistMap[result.disease] || "Consult a general physician"}
                  </div>
                )}
              </Card>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Diagnosis;
