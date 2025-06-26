import { getAllMessages, saveMessage } from "../models/messageModel.js";
import { getRandomRole, generateAntName } from "../utils/antUtils.js";

const renderBoardPage = (req, res) => {
  const name = req.session.name;
  const role = req.session.role;
  const messages = getAllMessages();
  res.render("index", { name, role, messages });
};

const renderNewMessageForm = (req, res) => {
  // make view generate form
  res.send("form");
};

const handlePostMessage = (req, res) => {
  const { name, role, topic, message } = req.body;
  const newEntry = { name, role, topic, message, timestamp: new Date() };
  saveMessage(newEntry);
  res.redirect("/");
};

const handleRebornRequest = (req, res) => {
  const role = getRandomRole();
  const name = generateAntName(role);
  req.session.role = role;
  req.session.name = name;
  res.redirect("/");
};

export {
  renderBoardPage,
  renderNewMessageForm,
  handlePostMessage,
  handleRebornRequest,
};
