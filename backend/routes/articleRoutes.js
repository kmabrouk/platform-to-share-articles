import express from "express";
import {
  getArticleById,
  getArticles,
  CreateArticle,
  DeleteArticle,
  UpdateArticle,
  likeArticle,
  commentArticle,
  IsApprove,
} from "../controllers/articleController.js";
const router = express.Router();
import { protect } from "../middleware/authMiddleware.js";

router.route("/").get(protect, getArticles);
router.route("/:id/likeArticle").patch(likeArticle);
router.route("/:id/commentArticle").put(commentArticle);
router.route("/:id/approve").post(protect, IsApprove);
router
  .route("/:id")
  .get(getArticleById)
  .delete(protect, DeleteArticle)
  .patch(protect, UpdateArticle);
router.route("/create").post(protect, CreateArticle);

export default router;
