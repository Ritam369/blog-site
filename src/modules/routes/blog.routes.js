import { Router } from "express"
import multer from "multer"
import blogController from "../controllers/blog.controller.js"

const router = Router()
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
})

router.get("/", blogController.getAllBlogs)
router.post("/", upload.single("blogCoverImage"), blogController.createBlog)

export default router
