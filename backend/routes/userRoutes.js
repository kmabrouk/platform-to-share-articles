import express from "express";
import {
  authUser,
  registerUser,
  getUsers,
  updateUserProfile,
  DeleteUser,
  getUserById,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.get("/myusers", protect, getUsers);
router.route("/:id").delete(protect, DeleteUser);
router.route("/:id/showprofile").get(getUserById);

router.route("/").post(registerUser);
router.post("/login", authUser);
router.route("/profile").post(protect, updateUserProfile);

export default router;
