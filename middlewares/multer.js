import multer from "multer";

let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname.trim() + "_" + Date.now() + "_" + file.originalname.trim());
  },
});

const upload = multer({
  storage: storage,
});

export default upload;
