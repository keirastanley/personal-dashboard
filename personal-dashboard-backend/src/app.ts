import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { MongoClient } from "mongodb";
import { getRoutes } from "./routes.js";

dotenv.config();

const app = express();
const port = 4000;

app.use(express.json());

app.use(cors());

MongoClient.connect(process.env.MONGO_URI!)
  .then((client) => {
    const db = client.db();
    app.use("/api/goals", getRoutes(db, "goals"));
    app.use("/api/tasks", getRoutes(db, "tasks"));
    app.use("/api/favourites", getRoutes(db, "favourites"));
    app.use("/api/ideas", getRoutes(db, "ideas"));
    app.use("/api/poems", getRoutes(db, "poems"));
    app.use("/api/diary", getRoutes(db, "diary"));

    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  })
  .catch((err) => console.error(err));
