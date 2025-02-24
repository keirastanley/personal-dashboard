import { z } from "zod";

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

export const favourite = baseItem.extend({
  starred: z.boolean(),
});

export const goal = baseItem.extend({
  starred: z.boolean(),
  progress: z.number(),
});

export const idea = baseItem;

export const task = baseItem.extend({
  priority: priorityEnum,
  status: statusEnum,
  deadline: z.string().date(),
});

export type Favourite = z.infer<typeof favourite>;
export type Goal = z.infer<typeof goal>;
export type Idea = z.infer<typeof idea>;
export type Task = z.infer<typeof task>;
export type Item = Favourite | Goal | Idea | Task;
