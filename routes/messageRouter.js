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
router.post("./message/:role", handlePostMessage);

// to add error handler

export { router };
