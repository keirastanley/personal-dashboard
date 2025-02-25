import express from "express";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import tasksRouter from "./routes/tasks.js";

dotenv.config();

const app = express();
const port = 4000;

app.use(express.json());

MongoClient.connect(process.env.MONGO_URI!)
  .then((client) => {
    const db = client.db();
    app.use("/api/tasks", tasksRouter(db));

    app.listen(port, () => {
      console.log(`Listening on port ${port}`);
    });
  })
  .catch((err) => console.error(err));
