import { Router } from "express";
const router = Router();
import { ensureIdentity } from "../middlewares/identity.js";
import {
  renderBoardPage,
  renderNewMessageForm,
  handlePostMessage,
  handleRebornRequest,
} from "../controllers/messageController.js";

router.get("/{index}", ensureIdentity, renderBoardPage);
router.get("/new", ensureIdentity, renderNewMessageForm);
router.get("/reborn", handleRebornRequest);
router.post("/message", handlePostMessage);

// simple 404 handler
router.use((req, res, next) => {
  res.status(404).send("Sorry, page not found!");
});

export { router };
