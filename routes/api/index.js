import { Router } from "express";
import getPosts from "./get-posts.js";

const router = Router();

router.get("/posts", getPosts);

export default router;
