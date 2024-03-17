var express = require("express");
const Router = require("./routes");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(
  cors({
    origin: "*",
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
app.use(express.json());
app.use(Router);

(function () {
  mongoose.connect(process.env.MONGO_DB_URI).catch((err) => console.log(err));

  mongoose.connection
    .once("open", () => console.log("Connected to MongoDB"))
    .on("error", (err) => console.log(err));
})();

// app startup
app.listen(PORT, () => {
  console.log(`Server is up and running on PORT: ${PORT}`);
});
