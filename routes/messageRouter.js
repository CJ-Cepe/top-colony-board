import { Router } from "express";
const router = Router();
import * as messageController from "../controllers/messageController.js";

router.get("/{index}", messageController.displayHome); // show board
router.get("/new", messageController.newMessageForm); // show message form
router.post("./message/:role", messageController.postMessage); // form submission

export { router };
