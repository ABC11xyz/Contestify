import express from "express";
import { signup } from "../controllers/auth.controllers";
const router=express.Router();
router.post('/signup',signup);
export default router;