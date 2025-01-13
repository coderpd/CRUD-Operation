import db from "../../../lib/db";

export default async function handler(req, res) {
  try {
    if (req.method === "GET") {
      const [rows] = await db.query("SELECT * FROM crud_db");
      res.status(200).json(rows);
    } else if (req.method === "POST") {
      const { name, location, salary } = req.body;
      await db.query(
        "INSERT INTO crud_db (name, location, salary) VALUES (?, ?, ?)",
        [name, location, salary]
      );
      res.status(201).json({ message: "Employee added successfully" });
    } else {
      res.status(405).json({ error: "Method not allowed" });
    }
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ error: "Internal server error" });
    }
  }
