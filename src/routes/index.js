import express from "express"
import fileUpload from "./fileUpload/index.js"
const router = express.Router()

router.use("/fileUpload", fileUpload)

export default router