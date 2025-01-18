import express from "express"
import cors from "cors"
import config from "./config.js"
import path from "path"
import { fileURLToPath } from "url"
import "./src/connection/index.js"
import routes from "./src/routes/index.js"
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const { PORT } = config
const app = express()
app.use(cors())
app.use(express.json())
app.use("/api", routes)
app.use(express.static('uploads'))
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.listen(PORT, () => {
    console.log("port running on 9000");
})