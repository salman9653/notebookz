const connectToMongo = require("./db");
connectToMongo();

const express = require("express");
const { Router } = require("express");
const app = express();
const port = 5000;

app.use(express.json());
//available Routes

app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(port, () => {
  console.log(`NoteBookZ BackEnd listening on port ${port}`);
});
