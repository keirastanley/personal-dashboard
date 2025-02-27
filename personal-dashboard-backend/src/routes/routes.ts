import { Router, Request, Response } from "express";
import { ObjectId, Db, WithId, Document } from "mongodb";
import {
  favouriteSchema,
  goalSchema,
  ideaSchema,
  taskSchema,
} from "../../../schemas/src/data";
import { DbError, DbSuccess } from "../../../schemas/src/api";

type Collection = "tasks" | "goals" | "favourites" | "ideas";

const getSuccessResponse = <Payload>(payload: Payload): DbSuccess<Payload> => ({
  success: true,
  payload,
});

const getErrResponse = (error: unknown, defaultMessage: string): DbError => ({
  success: false,
  message: error instanceof Error ? error.message : defaultMessage,
});

const getSchema = (collection: Collection) => {
  switch (collection) {
    case "tasks":
      return taskSchema;
    case "favourites":
      return favouriteSchema;
    case "goals":
      return goalSchema;
    case "ideas":
    default:
      return ideaSchema;
  }
};

export const getRoutes = (db: Db, collection: Collection) => {
  const router = Router();

  router.get("/", async (req: Request, res: Response) => {
    try {
      console.log({ collection });
      const items = await db.collection(collection).find().toArray();
      res.status(200).json(getSuccessResponse(items));
    } catch (error) {
      res
        .status(500)
        .json(getErrResponse(error, `Error fetching ${collection}`));
    }
  });

  router.post("/", async (req: Request, res: Response) => {
    try {
      const schema = getSchema(collection);
      const { error, success, data } = schema.safeParse(req.body);

      if (error || !success || !data) {
        res.status(400).json(getErrResponse(error, "Invalid data"));
      } else {
        const { insertedId } = await db.collection(collection).insertOne(data);
        const item = await db
          .collection(collection)
          .findOne({ _id: new ObjectId(insertedId) });

        res.status(201).json(getSuccessResponse(item));
      }
    } catch (error) {
      res.status(400).json(getErrResponse(error, "Invalid data"));
    }
  });

  router.get("/:id", async (req: Request, res: Response) => {
    const itemId = req.params.id;

    try {
      if (!ObjectId.isValid(itemId)) {
        res.status(400).json(getErrResponse(null, `Invalid ${collection} ID`));
      } else {
        const item = await db
          .collection(collection)
          .findOne({ _id: new ObjectId(itemId) });

        if (!item) {
          res.status(404).json(getErrResponse(null, "Item not found"));
        } else {
          res.status(200).json(getSuccessResponse(item));
        }
      }
    } catch (error) {
      res
        .status(500)
        .json(getErrResponse(error, `Error retrieving ${collection}`));
    }
  });

  router.patch("/:id", async (req: Request, res: Response) => {
    const itemID = req.params.id;

    try {
      if (!ObjectId.isValid(itemID)) {
        res.status(400).json(getErrResponse(null, `Invalid ${collection} ID`));
      } else {
        const schema = getSchema(collection);
        const { error, success, data } = schema.partial().safeParse(req.body);

        if (error || !success || !data) {
          res.status(400).json(getErrResponse(error, "Invalid data"));
        } else {
          const result = await db
            .collection(collection)
            .updateOne({ _id: new ObjectId(itemID) }, { $set: data });

          if (result.matchedCount === 0) {
            res.status(404).json(getErrResponse(null, "Item not found"));
          } else {
            const item = await db
              .collection(collection)
              .findOne({ _id: new ObjectId(itemID) });
            res.status(201).json(getSuccessResponse(item));
          }
        }
      }
    } catch (error) {
      res.status(500).json(getErrResponse(error, "Error updating item"));
    }
  });

  router.delete("/:id", async (req: Request, res: Response) => {
    const itemId = req.params.id;

    try {
      if (!ObjectId.isValid(itemId)) {
        res.status(400).json(getErrResponse(null, "Invalid item ID"));
      } else {
        const result = await db
          .collection(collection)
          .deleteOne({ _id: new ObjectId(itemId) });

        if (result.deletedCount === 0) {
          res.status(404).json(getErrResponse(null, "Item not found"));
        } else {
          res.status(200).json(getSuccessResponse("Item deleted successfully"));
        }
      }
    } catch (error) {
      res.status(500).json(getErrResponse(error, "Error deleting item"));
    }
  });

  return router;
};
