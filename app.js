import path from "node:path";
import express from "express";
import process from "node:process";

const app = express();
import { router as messageRouter } from "./routes/messageRouter.js";

console.log(path.join(process.cwd(), "views"));
app.set("views", path.join(process.cwd(), "views"));
app.set("view engine", "ejs");

/* app.use(express.urlencoded({ extended: true }));
app.use(express.static("public")); */

app.use("/", messageRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Colony Board is live at http://localhost:${PORT}`);
});
