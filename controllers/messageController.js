import { getAllMessages, saveMessage } from "../models/messageModel.js";
import {
  getRandomRole,
  generateAntName,
  getTopics,
} from "../utils/antUtils.js";

const renderBoardPage = (req, res) => {
  const name = req.session.name;
  const role = req.session.role;
  const messages = getAllMessages();
  console.log(messages[messages.length - 1]);
  res.render("index", { name, role, messages });
};

const renderNewMessageForm = (req, res) => {
  const name = req.session.name;
  const role = req.session.role;
  const topics = req.session.topics;
  res.render("new", { name, role, topics });
};

const handlePostMessage = (req, res) => {
  const { name, role, topic, message } = req.body;
  console.log(`POST res received: ${name}, ${role}, ${topic}, ${message}`);
  const newEntry = { name, role, topic, message, timestamp: new Date() };
  saveMessage(newEntry);
  res.redirect("/");
};

const handleRebornRequest = (req, res) => {
  const role = getRandomRole();
  const name = generateAntName(role);
  const topics = getTopics(role);
  req.session.role = role;
  req.session.name = name;
  req.session.topics = topics;
  res.redirect("/");
};

export {
  renderBoardPage,
  renderNewMessageForm,
  handlePostMessage,
  handleRebornRequest,
};
