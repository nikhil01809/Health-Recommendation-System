import axios from "axios";

export const predictDisease = async (req, res) => {
  console.log("📤 Sending Request to Flask:", req.body);
  
  try {
    const response = await axios.post("http://127.0.0.1:5001/api/predict", req.body);
    console.log("✅ Flask Response:", response.data);
    
    res.json(response.data);
  } catch (error) {
    console.error("❌ Error in Axios Request:", error.response?.data || error.message);
    res.status(500).json({ error: error.response?.data || "Prediction service failed" });
  }
};
