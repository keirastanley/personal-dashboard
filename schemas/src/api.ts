export type Collection = "tasks" | "goals" | "favourites" | "ideas" | "poems";

export type DbSuccess<PayloadItem> = {
  success: true;
  payload: PayloadItem;
};

export type DbError = {
  success: false;
  message: string;
};
