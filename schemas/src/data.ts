import { z, ZodObject, ZodRawShape, ZodSchema } from "zod";
import { ObjectId } from "mongodb";

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

export type Favourite = z.infer<typeof favouriteSchema>;
export type Goal = z.infer<typeof goalSchema>;
export type Idea = z.infer<typeof ideaSchema>;
export type Task = z.infer<typeof taskSchema>;
export type Item = Favourite | Goal | Idea | Task;

export type DbId = ObjectId;

export type FavouriteDb = Favourite & { _id: DbId };
export type GoalDb = Goal & { _id: DbId };
export type IdeaDb = z.infer<typeof ideaSchema> & { _id: DbId };
export type TaskDb = z.infer<typeof taskSchema> & { _id: DbId };
