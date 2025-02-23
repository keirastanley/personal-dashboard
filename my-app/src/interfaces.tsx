export enum Priority {
  low = "Low",
  medium = "Medium",
  high = "High",
}

export enum Status {
  notStarted = "not-started",
  inProgress = "in-progress",
  completed = "completed",
}
export type Starred = boolean;

export interface BaseItem {
  name: string;
  href?: string;
}

export interface Favourite extends Required<BaseItem> {
  starred: boolean;
}

export interface Goal extends BaseItem {
  starred: boolean;
  progress: number;
}

export interface Idea extends BaseItem {}

export interface Task extends BaseItem {
  priority: Priority;
  status: Status;
  deadline: string;
}

export type Item = Favourite | Goal | Idea | Task;
