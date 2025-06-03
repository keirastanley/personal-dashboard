export type Collection =
  | "tasks"
  | "goals"
  | "favourites"
  | "ideas"
  | "poems"
  | "diary";

export type DbSuccess<PayloadItem> = {
  success: true;
  payload: PayloadItem;
};

export type DbError = {
  success: false;
  message: string;
};
