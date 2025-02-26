import { Router, Request, Response } from "express";
import { ObjectId, Db, WithId, Document } from "mongodb";
import { Task, taskSchema } from "../../../schemas/src/data";
import { DbError, DbSuccess } from "../../../schemas/src/api";
import { getRoutes } from "./routes";

export default (db: Db) => getRoutes(db, "tasks");
