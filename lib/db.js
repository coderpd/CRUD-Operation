import mysql from "mysql2/promise";

const db = mysql.createPool({
  host: "localhost", // MySQL host
  user: "root",      // MySQL username
  password: "root",  
  database: "company", 
});

db.getConnection()
  .then(() => console.log("Database connected successfully"))
  .catch((error) => console.error("Database connection error:", error));

export default db;
