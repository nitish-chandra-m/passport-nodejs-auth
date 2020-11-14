import express from "express";
import { ensureAuthenticated, forwardAuthenticated } from "../config/auth.js";

const router = express.Router();

// Welcome Page
router.get("/", forwardAuthenticated, (req, res) => res.render("welcome"));
router.get("/dashboard", ensureAuthenticated, (req, res) =>
  res.render("dashboard", { user: req.user })
);

export default router;
