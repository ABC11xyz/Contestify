import express from "express";
import axios from "axios";
import cors from "cors"; // Allow frontend requests
import router from "./routes/auth.route.js";
const app = express();
app.use(express.json());
app.use(cors());
app.use('/api/v1/auth',router);

const JUDGE0_API = "http://localhost:2358"; 

app.post("/api/submit-code", async (req, res) => {
  try {
    const {
      language_id,
      source_code,
      stdin,
      expected_output,
      cpu_time_limit,
      memory_limit,
    } = req.body;

    // Send Code to Judge0
    const submission = await axios.post(`${JUDGE0_API}/submissions`, {
      language_id,
      source_code,
      stdin,
      expected_output, // Expected output
      cpu_time_limit,
      memory_limit,
    });

    const token = submission.data.token;

    // Wait for execution & Fetch Result
    let result;
    while (true) {
      result = await axios.get(`${JUDGE0_API}/submissions/${token}`);
      if (result.data.status.id >= 3) break; // 3 means execution complete
      await new Promise((r) => setTimeout(r, 1000)); // Wait before retry
    }

    //  Send response to frontend
    res.json(result.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Execution failed" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Backend running on port ${PORT}`));
