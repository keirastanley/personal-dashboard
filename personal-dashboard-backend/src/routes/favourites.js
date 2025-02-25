import express from "express";
const favouritesRouter = express.Router();
import {
  getFavourites,
  getFavouriteById,
  addNewFavourite,
  deleteFavourite,
} from "../models/favourites.js";

favouritesRouter.get("/", async function (req, res) {
  const result = await getFavourites();
  res.json({ success: true, payload: result });
});

favouritesRouter.get("/:id", async function (req, res) {
  const result = await getFavouriteById(req.params.id);
  res.json({ success: true, payload: result });
});

favouritesRouter.post("/", async function (req, res) {
  console.log(req.body);
  const result = await addNewFavourite(req.body);
  res.json({ success: true, payload: result });
});

favouritesRouter.delete("/:id", async function (req, res) {
  const result = await deleteFavourite(req.params.id);
  res.json({ success: true, payload: result });
});

export default favouritesRouter;
