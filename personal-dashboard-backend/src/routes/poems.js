import express from "express";
const poemsRouter = express.Router();
import {
  getPoems,
  getPoemById,
  addNewPoem,
  deletePoem,
} from "../models/poems.js";

poemsRouter.get("/", async function (req, res) {
  const result = await getPoems();
  res.json({ success: true, payload: result });
});

poemsRouter.get("/:id", async function (req, res) {
  const result = await getPoemById(req.params.id);
  res.json({ success: true, payload: result });
});

poemsRouter.post("/", async function (req, res) {
  const result = await addNewPoem(req.body);
  res.json({ success: true, payload: result });
});

poemsRouter.delete("/:id", async function (req, res) {
  const result = await deletePoem(req.params.id);
  res.json({ success: true, payload: result });
});

export default poemsRouter;
