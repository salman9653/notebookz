const connectToMongo = require("./db");
connectToMongo();

const express = require("express");
const { Router } = require("express");
const app = express();
const port = 3000;

app.use(express.json());
//available Routes

app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
