const multer = require("multer");
const router = require("express").Router();
const routerApi = require("./api");
const Controllers = require("../controllers");

router.use("/api", routerApi);

router.post("/generate-text", Controllers.GenerateText);

const upload = multer({ dest: "uploads/" });

router.post(
  "/generate-with-image",
  upload.single("image"),
  Controllers.GenerateImage
);

router.post(
  "/generate-with-document",
  upload.single("document"),
  Controllers.GenerateDocument
);
router.post(
  "/generate-with-audio",
  upload.single("audio"),
  Controllers.GenerateAudio
);

module.exports = router;
