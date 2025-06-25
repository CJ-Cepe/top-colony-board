import { Router } from "node:express";
const router = Router();
import {
  displayHome,
  newMessageForm,
  postMessage,
} from "../controllers/messageController";

router.get("/{index}", displayHome); // show board
router.get("/new", newMessageForm); // show message form
router.post("./message/:role", postMessage); // form submission

export default router;
