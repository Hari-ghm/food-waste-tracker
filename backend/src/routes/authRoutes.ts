import express from "express";
import { pool } from "../db";
import { SignupFormData } from "../types/user";

const router = express.Router();

// Signup
router.post("/signup", async (req, res) => {
  const data: SignupFormData = req.body;
  console.log("Signup received");

  try {
    await pool.query(
      `INSERT INTO users (email, name, type, phone, address, city, password)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [
        data.email,
        data.name,
        data.type,
        data.phone,
        data.address,
        data.city,
        data.password,
      ]
    );
    res.status(201).json({ message: "User signed up" });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Error signing up" });
  }
});

// Signin
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  console.log("Signin attempt:", { email, password });

  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1 AND password = $2",
      [email, password]
    );
    if (result.rowCount === 1) {
      const user = result.rows[0];

      res.status(200).json({
        message: "Login successful",
        id: user.id,
        type: user.type, // this allows frontend to route based on role
      });
      
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    console.error("Signin error:", err);
    res.status(500).json({ message: "Error signing in" });
  }
});

export default router;
