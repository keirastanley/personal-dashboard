import { Router, Request, Response } from "express";
import { ObjectId, Db } from "mongodb";
import { taskSchema } from "../../../schemas/src/data";

const router = Router();

export default (db: Db) => {
  router.get("/", async (req: Request, res: Response) => {
    try {
      const tasks = await db.collection("tasks").find().toArray();
      res.status(200).json(tasks);
    } catch (error) {
      res.status(500).json({ message: "Error fetching tasks" });
    }
  });

  router.post("/", async (req: Request, res: Response) => {
    try {
      const taskData = taskSchema.parse(req.body);

      const task = await db.collection("tasks").insertOne(taskData);

      res
        .status(201)
        .json({ message: "Task created", taskId: task.insertedId });
    } catch (error) {
      res.status(400).json({
        message: error instanceof Error ? error.message : "Invalid data",
      });
    }
  });

  router.get("/:id", async (req: Request, res: Response) => {
    const taskId = req.params.id;

    try {
      if (!ObjectId.isValid(taskId)) {
        return res.status(400).json({ message: "Invalid task ID" });
      }

      const task = await db
        .collection("tasks")
        .findOne({ _id: new ObjectId(taskId) });

      if (!task) {
        return res.status(404).json({ message: "Task not found" });
      }

      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving task" });
    }
  });

  router.put("/:id", async (req: Request, res: Response) => {
    const taskId = req.params.id;

    try {
      if (!ObjectId.isValid(taskId)) {
        return res.status(400).json({ message: "Invalid task ID" });
      }

      const taskData = taskSchema.partial().parse(req.body);

      const result = await db
        .collection("tasks")
        .updateOne({ _id: new ObjectId(taskId) }, { $set: taskData });

      if (result.matchedCount === 0) {
        return res.status(404).json({ message: "Task not found" });
      }

      res.status(200).json({ message: "Task updated successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error updating task", error });
    }
  });

  router.delete("/:id", async (req: Request, res: Response) => {
    const taskId = req.params.id;

    try {
      if (!ObjectId.isValid(taskId)) {
        return res.status(400).json({ message: "Invalid task ID" });
      }

      const result = await db
        .collection("tasks")
        .deleteOne({ _id: new ObjectId(taskId) });

      if (result.deletedCount === 0) {
        return res.status(404).json({ message: "Task not found" });
      }

      res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting task", error });
    }
  });

  return router;
};
