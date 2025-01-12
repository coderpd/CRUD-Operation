import db from "../../../lib/db";

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    if (req.method === "GET") {
      const [rows] = await db.query("SELECT * FROM crud_db WHERE id = ?", [id]);
      if (rows.length === 0) {
        return res.status(404).json({ error: "Employee not found" });
      }
      res.status(200).json(rows[0]);
    } else if (req.method === "PUT") {
      const { name, location, salary } = req.body;
      await db.query(
        "UPDATE crud_db SET name = ?, location = ?, salary = ? WHERE id = ?",
        [name, location, salary, id]
      );
      res.status(200).json({ message: "Employee updated successfully" });
    } else if (req.method === "DELETE") {
      await db.query("DELETE FROM crud_db WHERE id = ?", [id]);
      res.status(200).json({ message: "Employee deleted successfully" });
    } else {
      res.status(405).json({ error: "Method not allowed" });
    }
  } catch (error) {
    console.error("API Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
