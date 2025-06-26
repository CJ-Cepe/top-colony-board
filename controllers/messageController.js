import * as messageModel from "../models/messageModel.js";

const displayHome = (req, res) => {
  // generate home
  const messages = messageModel.getAllMessages();
  res.render("index", { messages });
};

const newMessageForm = (req, res) => {
  // make view generate form
  res.send("form");
};

const postMessage = (req, res) => {
  //res.redirect('/');
  const { name, role, topic, message } = req.body;
  const newEntry = { name, role, topic, message, timestamp: new Date() };
  messageModel.saveMessage(newEntry);
  res.redirect("/");
};

export { displayHome, newMessageForm, postMessage };
