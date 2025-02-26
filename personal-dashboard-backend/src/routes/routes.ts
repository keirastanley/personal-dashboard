import { Router, Request, Response } from "express";
import { ObjectId, Db, WithId, Document } from "mongodb";
import { Task, taskSchema } from "../../../schemas/src/data";
import { DbError, DbSuccess } from "../../../schemas/src/api";

const router = Router();

const getSuccessResponse = <Payload>(payload: Payload): DbSuccess<Payload> => ({
  success: true,
  payload,
});

const getErrResponse = (error: unknown, defaultMessage: string): DbError => ({
  success: false,
  message: error instanceof Error ? error.message : defaultMessage,
});

export const getRoutes = (db: Db, collection: string) => {
  router.get("/", async (req: Request, res: Response) => {
    try {
      const tasks = await db.collection(collection).find().toArray();
      res.status(200).json(getSuccessResponse(tasks));
    } catch (error) {
      res
        .status(500)
        .json(getErrResponse(error, `Error fetching ${collection}`));
    }
  });

  router.post("/", async (req: Request, res: Response) => {
    try {
      const { error, success, data } = taskSchema.safeParse(req.body);

      if (error || !success || !data) {
        res.status(400).json(getErrResponse(error, "Invalid data"));
      } else {
        const { insertedId } = await db.collection(collection).insertOne(data);
        const task = await db
          .collection(collection)
          .findOne({ _id: new ObjectId(insertedId) });

        res.status(201).json(getSuccessResponse(task));
      }
    } catch (error) {
      res.status(400).json(getErrResponse(error, "Invalid data"));
    }
  });

  router.get("/:id", async (req: Request, res: Response) => {
    const taskId = req.params.id;

    try {
      if (!ObjectId.isValid(taskId)) {
        res.status(400).json(getErrResponse(null, `Invalid ${collection} ID`));
      }

      const task = await db
        .collection(collection)
        .findOne({ _id: new ObjectId(taskId) });

      if (!task) {
        res.status(404).json(getErrResponse(null, "Task not found"));
      }

      res.status(200).json(getSuccessResponse(task));
    } catch (error) {
      res
        .status(500)
        .json(getErrResponse(error, `Error retrieving ${collection}`));
    }
  });

  router.patch("/:id", async (req: Request, res: Response) => {
    console.log(req.body);
    const taskId = req.params.id;

    try {
      if (!ObjectId.isValid(taskId)) {
        res.status(400).json(getErrResponse(null, `Invalid ${collection} ID`));
      }

      const { error, success, data } = taskSchema.partial().safeParse(req.body);

      if (error || !success || !data) {
        res.status(400).json(getErrResponse(error, "Invalid data"));
      } else {
        const result = await db
          .collection(collection)
          .updateOne({ _id: new ObjectId(taskId) }, { $set: data });

        if (result.matchedCount === 0) {
          res.status(404).json(getErrResponse(null, "Item not found"));
        } else {
          const task = await db
            .collection(collection)
            .findOne({ _id: new ObjectId(taskId) });
          res.status(201).json(getSuccessResponse(task));
        }
      }
    } catch (error) {
      res.status(500).json(getErrResponse(error, "Error updating item"));
    }
  });

  router.delete("/:id", async (req: Request, res: Response) => {
    const taskId = req.params.id;

    try {
      if (!ObjectId.isValid(taskId)) {
        res.status(400).json(getErrResponse(null, "Invalid item ID"));
      } else {
        const result = await db
          .collection(collection)
          .deleteOne({ _id: new ObjectId(taskId) });

        if (result.deletedCount === 0) {
          res.status(404).json(getErrResponse(null, "Item not found"));
        }

        res.status(200).json(getSuccessResponse("Item deleted successfully"));
      }
    } catch (error) {
      res.status(500).json(getErrResponse(error, "Error deleting item"));
    }
  });

  return router;
};
