import mongoose from "mongoose"

const blogSchema = new mongoose.Schema(
  {
    blogTitle: {
      type: String,
      required: true,
      trim: true,
    },
    blogCoverImage: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    blogURL: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
)

const Blog = mongoose.model("Blog", blogSchema)

export default Blog
