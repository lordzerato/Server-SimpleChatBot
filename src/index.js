require("dotenv").config();

const express = require("express");
const cors = require("cors");
const router = require("./routes");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/", router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
