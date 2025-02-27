import { z } from "zod";
import {
  ObjectId as ObjectIdMongoDb,
  WithId as WithIdMongoDb,
  WithoutId as WithoutIdMongoDb,
} from "mongodb";

export enum Priority {
  low = "low",
  medium = "medium",
  high = "high",
}

export enum Status {
  notStarted = "not-started",
  inProgress = "in-progress",
  completed = "completed",
}

export const priorityEnum = z.nativeEnum(Priority);

export const statusEnum = z.nativeEnum(Status);

export const baseItem = z.object({
  name: z.string(),
  href: z.string().optional(),
});

export const favouriteSchema = baseItem.extend({
  starred: z.boolean(),
});

export const goalSchema = baseItem.extend({
  starred: z.boolean(),
  progress: z.number(),
});

export const ideaSchema = baseItem;

export const taskSchema = baseItem.extend({
  priority: priorityEnum,
  status: statusEnum,
  deadline: z.string().date(),
});

export type ObjectId = ObjectIdMongoDb;

export type WithId<T> = WithIdMongoDb<T>;

export type WithoutId<T> = WithoutIdMongoDb<T>;

export type Favourite = WithIdMongoDb<z.infer<typeof favouriteSchema>>;
export type Goal = WithIdMongoDb<z.infer<typeof goalSchema>>;
export type Idea = WithIdMongoDb<z.infer<typeof ideaSchema>>;
export type Task = WithIdMongoDb<z.infer<typeof taskSchema>>;
export type Item = Favourite | Goal | Idea | Task;
