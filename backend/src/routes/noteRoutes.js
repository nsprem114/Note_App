import express from "express";
import {
  createNotes,
  deleteNotes,
  getAllNotes,
  getNote,
  updateNotes,
} from "../controllers/noteControllers.js";

const router = express.Router();

router.get("/", getAllNotes);
router.post("/", createNotes);
router.get("/:id", getNote);
router.put("/:id", updateNotes);
router.delete("/:id", deleteNotes);

export default router;
