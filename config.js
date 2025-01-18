import dotenv from "dotenv"
dotenv.config()
const {DATABASE,PORT}=process.env
const config={DATABASE,PORT}
export default config