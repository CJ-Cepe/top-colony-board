import path from "node:path";
import express from "node:express";
const app = express();
import messageRoutes from "./routes/messageRouter.js";

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use("/", messageRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Colony Board is live at http://localhost:${PORT}`);
});
