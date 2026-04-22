import imagekit from "../../common/config/imagekit.js"
import Blog from "../models/blog.model.js"
import ApiError from "../../common/utils/api-error.js"

const uploadToImageKit = async (fileBuffer, fileName, mimeType) => {
  const result = await imagekit.upload({
    file: fileBuffer,
    fileName,
    folder: "/blog-covers",
    useUniqueFileName: true,
  })
  return result.url
}

const createBlog = async ({ blogTitle, description, blogURL }, file) => {
  if (!file) throw ApiError.badRequest("Cover image is required")

  const imageUrl = await uploadToImageKit(file.buffer, file.originalname, file.mimetype)

  const blog = await Blog.create({ blogTitle, blogCoverImage: imageUrl, description, blogURL })
  return blog
}

const getAllBlogs = async () => {
  return Blog.find().sort({ createdAt: -1 })
}

export default { createBlog, getAllBlogs }
