import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

const articleSchema = mongoose.Schema(
  {
    isApprove: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    pic: {
      type: String,
      required: true,
      default:
        "https://infos-geek.com/wp-content/uploads/2020/07/remettre-theme-par-defaut5.png?ezimgfmt=rs:256x256/rscb78/ng:webp/ngcb78",
    },
    likeCount: {
      type: Number,
      default: 0,
    },
    comments: [
      {
        text: String,
        postedBy: { type: ObjectId, ref: "User" },
      },
    ],
    postedBy: {
      type: ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const Article = mongoose.model("Article", articleSchema);

export default Article;
