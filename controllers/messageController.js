import { getAllMessages, saveMessage } from "../models/messageModel.js";
import { sanitizePlainText } from "../utils/sanitizer.js";
import {
  getRandomRole,
  generateAntName,
  getTopics,
  getDescription,
} from "../utils/antUtils.js";

const renderBoardPage = (req, res) => {
  const name = req.session.name;
  const role = req.session.role;
  const description = req.session.description;
  const messages = getAllMessages();
  res.render("home", { name, role, description, messages });
};

const renderNewMessageForm = (req, res) => {
  const name = req.session.name;
  const role = req.session.role;
  const description = req.session.description;
  const topics = req.session.topics;
  res.render("new", { name, role, description, topics });
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

const handleRebornRequest = (req, res) => {
  const role = getRandomRole();
  const name = generateAntName(role);
  const description = getDescription(role);
  const topics = getTopics(role);
  req.session.role = role;
  req.session.name = name;
  req.session.topics = topics;
  req.session.description = description;
  res.redirect("/");
};

export {
  renderBoardPage,
  renderNewMessageForm,
  handlePostMessage,
  handleRebornRequest,
};
