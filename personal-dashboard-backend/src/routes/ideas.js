import express from "express";
const ideasRouter = express.Router();
import {
  getIdeas,
  getIdeaById,
  addNewIdea,
  deleteIdea,
} from "../models/ideas.js";

ideasRouter.get("/", async function (req, res) {
  const result = await getIdeas();
  res.json({ success: true, payload: result });
});

ideasRouter.get("/:id", async function (req, res) {
  const result = await getIdeaById(req.params.id);
  res.json({ success: true, payload: result });
});

ideasRouter.post("/", async function (req, res) {
  const result = await addNewIdea(req.body);
  res.json({ success: true, payload: result });
});

ideasRouter.delete("/:id", async function (req, res) {
  const result = await deleteIdea(req.params.id);
  res.json({ success: true, payload: result });
});

export default ideasRouter;
