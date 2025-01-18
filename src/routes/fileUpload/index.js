import express from "express"
import upload from "../../middleware/multer.js"
import File from "../../models/fileUpload.js"
import fs from "fs"
const router = express.Router()


router.post("/", upload.single("media"), async (req, res) => {
    try {
        const file = req.file;
        if (!file) {
            return res.status(400).json({ msg: "No file uploaded" });
        }
        const newFile = new File({ fileName: file.originalname, fileUrl: file.path, })
        await newFile.save()
        res.status(200).json({ msg: "File uploaded sucessfully" })
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Internal server error" })
    }
})

router.get("/", async (req, res) => {
    try {
        const txtFile = await File.find({})
        res.status(200).json({ msg: "text file", txtFile })
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Internal server error" })
    }
})
router.get('/files/:id', async (req, res) => {
    try {
        const file = await File.findById(req.params.id);
        const content = fs.readFileSync(file.fileUrl, 'utf-8');
        res.status(200).json({ content });
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Internal server error" })
    }

});
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { content } = req.body;
        const file = await File.findById(id);
        if (!file) return res.status(404).json({ message: "File not found" });
        fs.writeFileSync(file.fileUrl, content);
        res.status(200).json({ message: 'File updated' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Internal server error" })
    }
});


router.delete("/:id", async (req, res) => {
    try {
        const file = await File.findById(req.params.id);
        if (!file) return res.status(404).json({ message: "File not found" });
        fs.unlinkSync(file.fileUrl);
        await File.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: "File deleted successfully" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Internal server error" })
    }
})
export default router