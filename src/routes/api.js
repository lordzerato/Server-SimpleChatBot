const router = require("express").Router();
const { ApiChat } = require("../controllers");

router.post("/chat", ApiChat);

module.exports = router;
