import express from "express";
import { makeInvoker } from "awilix-express";
import UserController from "../../controllers/UserController";
import { verifyToken } from "../../middlewares/verifyToken";

const api = makeInvoker(UserController);
const router = express.Router();

router.post("/", api("create"));
router.post("/login", api("login"));
router.get("/", verifyToken, api("getAll"));
router.get("/top-three", verifyToken, api("getUsersPerformance"));
router.get("/:userId", verifyToken, api("get"));

export default router;
