import path from "node:path";
import process from "node:process";
import express from "express";
import session from "express-session";
import { router } from "./routes/messageRouter.js";
const app = express();

app.set("views", path.join(process.cwd(), "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(
  session({
    secret: "colony-secret",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
  })
);

app.use("/", router);

// catch all error handler
app.use((err, req, res, next) => {
  console.error(err);
  const statusCode = err.statusCode || 500;
  res.status(statusCode);

  if (process.env.NODE_ENV === "production") {
    res.send("Internal Server Error");
  } else {
    res.json({
      status: "error",
      message: err.message,
      stack: err.stack,
    });
  }
});

const PORT = process.env.PORT || 3000;
const HOST = process.env.NODE_ENV === "production" ? "0.0.0.0" : "localhost";

app.listen(PORT, HOST, () => {
  console.log(`Colony Board is live. Listening on port ${PORT}.`);
  if (process.env.NODE_ENV !== "production") {
    console.log(`Access locally at http://${HOST}:${PORT}`);
  }
});
