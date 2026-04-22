import "dotenv/config"
import express from "express"
import path from "path"
import { fileURLToPath } from "url"
import connectDB from "./src/common/config/db.js"
import blogRoutes from "./src/modules/routes/blog.routes.js"

const app = express()
const __dirname = path.dirname(fileURLToPath(import.meta.url))

app.use(express.json())
app.use(express.static(path.join(__dirname, "public")))

app.use("/api/blogs", blogRoutes)

// Global error handler
app.use((err, req, res, next) => {
  const status = err.statusCode || 500
  res.status(status).json({ success: false, message: err.message || "Server Error" })
})

connectDB().then(() => {
  const PORT = process.env.PORT || 3000
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})
