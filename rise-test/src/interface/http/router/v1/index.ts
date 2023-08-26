import express from "express";
// import other routes

import userRouter from "./userRouter";
import postRouter from "./postRouter";

const router = express.Router();

// mount routes
router.use("/users", userRouter);
router.use("/posts", postRouter);

export default router;
