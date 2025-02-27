import { DbError, DbSuccess } from "@schemas/api";
import { API_BASE_URL } from "./constants";
import { ObjectId, WithoutId } from "@schemas/data";

export const getItems = <ItemType>(path: string) =>
  fetch(`${API_BASE_URL}/${path}`, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => data as DbSuccess<ItemType>)
    .catch((error) => error as DbError);

export const addItem = <ItemType>(path: string, body: WithoutId<ItemType>) =>
  fetch(`${API_BASE_URL}/${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((data) => data as DbSuccess<ItemType>)
    .catch((error) => error as DbError);

export const editItem = <ItemType>(
  path: string,
  id: ObjectId,
  body: Partial<ItemType>
) =>
  fetch(`${API_BASE_URL}/${path}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((data) => data as DbSuccess<ItemType>)
    .catch((error) => error as DbError);

export const deleteItem = (path: string, id: ObjectId) =>
  fetch(`${API_BASE_URL}/${path}/${id}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => data as DbSuccess<string>)
    .catch((error) => error as DbError);
