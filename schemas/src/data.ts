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

export const galleryImageSchema = baseItem.extend({
  nameOrgLang: z
    .object({
      lang: z.string(),
      name: z.string(),
    })
    .optional(),
  artist: z.string(),
  medium: z.string().optional(),
  year: z.string(),
  src: z.string(),
  alt: z.string(),
  tags: z.array(z.string()),
  info: z
    .object({
      text: z.string(),
      infoFrom: z.string().optional(),
      src: z.string().optional(),
      onView: z.string().optional(),
    })
    .optional(),
});

export const poemSchema = z.object({
  title: z.string(),
  author: z.string(),
  lines: z.array(z.string()),
});

export type ObjectId = ObjectIdMongoDb;
export type WithId<T> = WithIdMongoDb<T>;
export type WithoutId<T> = WithoutIdMongoDb<T>;

export type GalleryImage = z.infer<typeof galleryImageSchema>;

export type Favourite = WithId<z.infer<typeof favouriteSchema>>;
export type Goal = WithId<z.infer<typeof goalSchema>>;
export type Idea = WithId<z.infer<typeof ideaSchema>>;
export type Task = WithId<z.infer<typeof taskSchema>>;
export type Poem = WithId<z.infer<typeof poemSchema>>;

export type Item = Favourite | Goal | Idea | Task;
