import express from "express";
import { pool } from "../db";


const router = express.Router();

router.post("/donations", async (req, res) => {
  const {
    food_name,
    food_type,
    avg_food_per_person,
    waste_reason,
    notes,
    user_id,
  } = req.body;
  console.log(user_id);
  try {
    const result = await pool.query(
      `INSERT INTO donation 
        (food_name, food_type, avg_food_per_person, waste_reason, notes, donated_by)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [
        food_name,
        food_type,
        avg_food_per_person,
        waste_reason,
        notes,
        user_id,
      ]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error adding donation:", error);
    res.status(500).json({ error: "Failed to add donation" });
  }
});

router.get("/donations/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await pool.query(
      `SELECT * FROM donation WHERE donated_by = $1 ORDER BY timestamp DESC`,
      [userId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching donations:", error);
    res.status(500).json({ error: "Failed to fetch donations" });
  }
});


export default router;
