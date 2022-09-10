const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const connectdb = require("./shared/shared");
const app = express();
app.use(express.json());
app.use(cors());
const userrouter = require("./routes/userroute");
const memoriesrouter = require("./routes/memories");

connectdb();

app.use("/api/user", userrouter);

app.use("/api/memories", memoriesrouter);

app.get("/", (req, res) => {
  res.send(`Server is Running in ${PORT} !!!`);
});
const PORT = process.env.PORT;
app.listen(PORT || 3015);
