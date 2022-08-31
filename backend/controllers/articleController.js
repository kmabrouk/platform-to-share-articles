import mongoose from "mongoose";
import Article from "../models/articleModel.js";
import asyncHandler from "express-async-handler";
// @desc    Get logged in user articles
// @route   GET /api/articles
// @access  Private
const getArticles = async (req, res) => {
  // const articles = await Article.find({ user: req.user._id });
  const articles = await Article.find();

  res.json(articles);
};

//@description     Fetch single Article
//@route           GET /api/articles/:id
//@access          Public
const getArticleById = async (req, res) => {
  const article = await Article.findById(req.params.id).populate(
    "comments.postedBy",
    "-password"
  );
  if (article) {
    return res.json(article);
  } else {
    return res.status(404).json({ message: "Article not found" });
  }

  return res.json(article);
};

//@description     Create single Article
//@route           POST /api/articles/create
//@access          Private
const CreateArticle = asyncHandler(async (req, res) => {
  const { title, content, category, pic } = req.body;

  if (!title || !content || !category) {
    res.status(400);
    throw new Error("Please Fill all the feilds");
    return;
  } else {
    const article = new Article({
      user: req.user._id,
      title,
      content,
      category,
      pic,
    });

    const createdArticle = await article.save();

    res.status(201).json(createdArticle);
  }
});

//@description     Delete single Article
//@route           GET /api/articles/:id
//@access          Private
const DeleteArticle = async (req, res) => {
  const article = await Article.findById(req.params.id);

  if (article) {
    await article.remove();
    res.json({ message: "Article Removed" });
  } else {
    res.status(404);
    throw new Error("Article not Found");
  }
};

// @desc    Update a article
// @route   PUT /api/articles/:id
// @access  Private
const UpdateArticle = async (req, res) => {
  const { title, content, category, pic } = req.body;

  const article = await Article.findById(req.params.id);

  if (article.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("You can't perform this action");
  }

  if (article) {
    article.title = title;
    article.content = content;
    article.category = category;
    article.pic = pic;

    const updatedArticle = await article.save();
    res.json(updatedArticle);
  } else {
    res.status(404);
    throw new Error("Article not found");
  }
};

//@description     Approve an article
//@route           POST /api/articles/:id/IsApprove
//@access          Private

const IsApprove = async (req, res) => {
  const { id } = req.params;
  const data = await Article.findByIdAndUpdate(id, { isApprove: true });
  res.send(data);
};

//@description     Like Article
//@route           POST /api/articles/:id/likeArticle
//@access          Private
const likeArticle = async (req, res) => {
  let { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send(`No post with id: ${id}`);

  const article = await Article.findById(id);

  const updatedArticle = await Article.findByIdAndUpdate(
    id,
    { likeCount: article.likeCount + 1 },
    { new: true }
  );

  res.json(updatedArticle);
};

//@description     Comment Article
//@route           POST /api/articles/:id/commentArticle
//@access          Private

const commentArticle = async (req, res) => {
  console.log(req.params);

  const comment = {
    text: req.body.text,
    postedBy: req.body.userId,
  };

  let article = await Article.findByIdAndUpdate(
    req.params.id,
    {
      $push: { comments: comment },
    },
    {
      new: true,
    }
  ).populate("comments.postedBy", "-password");

  res.status(201).json(article);
};

export {
  getArticleById,
  getArticles,
  CreateArticle,
  DeleteArticle,
  UpdateArticle,
  likeArticle,
  commentArticle,
  IsApprove,
};
