require("dotenv").config();
const express = require("express");
const connectDB = require("./utils/db");
const auth = require("./router/auth-router")
const app = express();
PORT = 6000;
app.use(express.json());

app.use("/api/auth", auth);


connectDB().then(() => {
  try {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error, "database error");
  }
});
