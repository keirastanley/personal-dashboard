import { Collection, DbError, DbSuccess } from "@schemas/api";
import { API_BASE_URL } from "./constants";
import { ObjectId, WithoutId } from "@schemas/data";

export const getItems = <ItemType>(path: Collection) =>
  fetch(`${API_BASE_URL}/${path}`, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => data as DbSuccess<ItemType>)
    .catch((error) => error as DbError);

export const addItem = <ItemType>(
  path: Collection,
  body: WithoutId<ItemType>
) =>
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
  path: Collection,
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

export const deleteItem = (path: Collection, id: ObjectId) =>
  fetch(`${API_BASE_URL}/${path}/${id}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => data as DbSuccess<string>)
    .catch((error) => error as DbError);
