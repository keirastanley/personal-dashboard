import express from "express";
const artRouter = express.Router();
import {
  getArt,
  getItemById,
  getItemsFromGallery,
  addNewItem,
  deleteItem,
} from "../models/art.js";

//Get from Met Museum
// artRouter.get("/", async function (req, res) {
//     const result = await getArt();
//     res.json({success: true, payload: result})
// })

artRouter.get("/", async function (req, res) {
  const result = await getItemsFromGallery();
  res.json({ success: true, payload: result });
});

artRouter.get("/:id", async function (req, res) {
  const result = await getItemById(req.params.id);
  res.json({ success: true, payload: result });
});

artRouter.post("/", async function (req, res) {
  const result = await addNewItem();
  res.json({ success: true, payload: result });
});

artRouter.delete("/", async function (req, res) {
  const result = await deleteItem(req.params.id);
  res.json({ success: true, payload: result });
});
export default artRouter;
