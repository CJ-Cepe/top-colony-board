import { getAllMessages, saveMessage } from "../models/messageModel.js";
import { assignNewAntIdentityToSession } from "../utils/antUtils.js";
import {
  validateMessageForm,
  checkValidationResult,
} from "../middlewares/sanitizer.js";

const renderBoardPage = async (req, res) => {
  const { name, role, description } = req.session;
  const messages = await getAllMessages();
  res.render("home", { viewType: "board", name, role, description, messages });
};

const renderNewMessageForm = (req, res) => {
  const { name, role, description, topics } = req.session;
  res.render("home", { viewType: "form", name, role, description, topics });
};

const handleRebornRequest = (req, res) => {
  assignNewAntIdentityToSession(req.session);
  res.redirect("/");
};

const handlePostMessage = [
  validateMessageForm,
  checkValidationResult,
  async (req, res) => {
    const { name, role, topic, content } = req.body;
    const newEntry = {
      name,
      role,
      topic,
      content,
      timestamp: new Date(),
    };

    await saveMessage(newEntry);
    res.redirect("/");
  },
];

export {
  renderBoardPage,
  renderNewMessageForm,
  handlePostMessage,
  handleRebornRequest,
};
