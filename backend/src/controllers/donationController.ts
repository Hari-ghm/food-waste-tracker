import { Request, Response } from "express";
import type { Donation } from "../types/user";
import { pool as db } from "../db";


export const addDonation = async (req: Request, res: Response) => {
  const {
    food_name,
    quantity,
    food_type,
    avg_food_per_person,
    waste_reason,
    notes,
    user_id, 
  } = req.body;

  try {
    const result = await db.query(
      `INSERT INTO donation 
        (food_name, quantity, food_type, avg_food_per_person, waste_reason, notes, donated_by)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [
        food_name,
        quantity,
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
};

export const getDonationsByUser = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const result = await db.query(
      `SELECT * FROM donation WHERE donated_by = $1 ORDER BY timestamp DESC`,
      [userId]
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching donations:", error);
    res.status(500).json({ error: "Failed to fetch donations" });
  }
};
