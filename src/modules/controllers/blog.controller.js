import blogService from "../services/blog.service.js"
import ApiResponse from "../../common/utils/api-response.js"
import ApiError from "../../common/utils/api-error.js"

const createBlog = async (req, res, next) => {
  try {
    const { blogTitle, description, blogURL } = req.body
    if (!blogTitle || !description || !blogURL) throw ApiError.badRequest("All fields are required")

    const blog = await blogService.createBlog({ blogTitle, description, blogURL }, req.file)
    ApiResponse.created(res, "Blog created", blog)
  } catch (err) {
    next(err)
  }
}

const getAllBlogs = async (req, res, next) => {
  try {
    const blogs = await blogService.getAllBlogs()
    ApiResponse.ok(res, "Blogs fetched", blogs)
  } catch (err) {
    next(err)
  }
}

export default { createBlog, getAllBlogs }
