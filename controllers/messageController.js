import { getAllMessages, saveMessage } from "../models/messageModel.js";
import { assignNewAntIdentityToSession } from "../utils/antUtils.js";
import { sanitizePlainText } from "../utils/sanitizer.js";

const renderBoardPage = (req, res) => {
  const { name, role, description } = req.session;
  const messages = getAllMessages();
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

const handlePostMessage = (req, res) => {
  const { name, role, topic, content } = req.body;
  const sanitizedName = sanitizePlainText(name);
  const sanitizedRole = sanitizePlainText(role);
  const sanitizedTopic = sanitizePlainText(topic);
  const sanitizedContent = sanitizePlainText(content);

  const newEntry = {
    name: sanitizedName,
    role: sanitizedRole,
    topic: sanitizedTopic,
    content: sanitizedContent,
    timestamp: new Date(),
  };

  saveMessage(newEntry);
  res.redirect("/");
};

export {
  renderBoardPage,
  renderNewMessageForm,
  handlePostMessage,
  handleRebornRequest,
};
