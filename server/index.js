const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const authRoute = require("./Routes/AuthRoute")
const cookieParser = require("cookie-parser")

const {MONGO_URL,PORT} = process.env

const app = express();

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB is  connected successfully"))
  .catch((err) => console.error(err));

app.listen(parseInt(PORT), () => {
  console.log(`Server is listening on port ${PORT}`);
});

app.use(cookieParser())

app.use(
    cors({
      origin: ["http://localhost:5173"],
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    })
  );
  
  app.use(express.json());

  app.use("/auth", authRoute)