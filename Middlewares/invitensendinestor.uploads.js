// invitensendinestor.uploads.js

import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDir = "./assets/profiles";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) =>
    cb(null, `${Date.now()}-${file.originalname}`),
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "video/mp4",
    "video/mov",
    "video/avi",
    "application/pdf",
    "application/msword",
    "application/vnd.ms-powerpoint",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Unsupported file type"), false);
  }
};

// ✅ Export the fully configured middleware
const invite_sendinvestorupload = multer({
  storage,
  fileFilter,
}).fields([
  { name: "inviteFile", maxCount: 1 },
  { name: "databaseFile", maxCount: 1 },
]);

export default invite_sendinvestorupload;


