const express = require("express");
const app = express();
const port = 3000;

function loginMiddleware(req, res, next) {
  const timeStamp = new Date();
  console.log(`request recieved at: ${timeStamp}`);
  res.setHeader("X-Codaisseur-Time", timeStamp);
  next();
}

function failedRandomlyMiddleware(req, res, next) {
  if (Math.random() >= 0.5) {
    next();
  } else {
    res.status(500).end();
  }
}

app.use(failedRandomlyMiddleware);

// app.use(loginMiddleware);

app.get("/", (req, res) => res.send("Hello"));

app.get("/foo", loginMiddleware);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
