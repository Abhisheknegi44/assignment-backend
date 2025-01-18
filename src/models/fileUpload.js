import mongoose from "mongoose";
import { Schema } from "mongoose";

const newFileUpload = new Schema(
    {
        fileName: {
            type: String
        },
        fileUrl: {
            type: String
        }
    }, {
    timestamps: true
}
)
export default mongoose.model("fileUpload", newFileUpload)