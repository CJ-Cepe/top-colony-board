import { Router } from "express";
const router = Router();
import {
  displayHome,
  newMessageForm,
  postMessage,
} from "../controllers/messageController.js";

router.get("/{index}", displayHome); // show board
router.get("/new", newMessageForm); // show message form
router.post("./message/:role", postMessage); // form submission

export { router as messageRouter };
