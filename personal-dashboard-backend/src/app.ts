import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { MongoClient } from "mongodb";
import tasksRouter from "./routes/tasks.js";
import { getRoutes } from "./routes/routes.js";

dotenv.config();

const app = express();
const port = 4000;

app.use(express.json());

app.use(cors());

MongoClient.connect(process.env.MONGO_URI!)
  .then((client) => {
    const db = client.db();
    app.use("/api/tasks", getRoutes(db, "tasks"));
    app.use("/api/favourites", getRoutes(db, "favourites"));
    app.use("/api/goals", getRoutes(db, "goals"));
    app.use("/api/ideas", getRoutes(db, "ideas"));

    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  })
  .catch((err) => console.error(err));
