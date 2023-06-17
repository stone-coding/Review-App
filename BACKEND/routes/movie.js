const express = require("express");
const { isAuth, isAdmin } = require("../middlewares/auth");
const { uploadVideo, uploadImage } = require("../middlewares/multer");
const { uploadTrailer, createMovie } = require("../controllers/movie");

const router = express.Router();

router.post(
  "/upload-trailer",
  isAuth,
  isAdmin,
  uploadVideo.single("video"),
  uploadTrailer
);

router.post(
    "/create",
    isAuth,
    isAdmin,
    uploadImage.single("poster"),
    createMovie
  );

module.exports = router;
