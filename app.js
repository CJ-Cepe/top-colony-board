import path from "node:path";
import process from "node:process";
import express from "express";
import session from "express-session";
import pgSession from "connect-pg-simple";
import dbPool from "./models/dbPool.js";
import { router } from "./routes/messageRouter.js";
const app = express();

app.set("views", path.join(process.cwd(), "views"));
app.set("view engine", "ejs");

// tells express to trust the proxy (Railway's load balancer)
// correctly read the X-Forwarded-Proto header from the proxy
app.set("trust proxy", 1);

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// create a store
const PgSession = pgSession(session);

app.use(
  session({
    store: new PgSession({
      pool: dbPool,
      tableName: "session_store",
      createTableIfMissing: true,
    }),
    secret: process.env.SESSION_SECRET || "t0_Ch@ng3_th1s_Str1ng",
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something stored
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 1 day (in milliseconds)
      httpOnly: true, // prevents client-side JS from accessing the cookie
      secure: process.env.NODE_ENV === "production", // only send cookie over HTTPS in production
      sameSite: "lax", //  'lax' for same-site requests
    },
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
  console.log(`Colony Board is live. http://${HOST}:${PORT}`);
  if (process.env.NODE_ENV !== "production") {
    console.log(`Access locally at http://${HOST}:${PORT}`);
  }
});
