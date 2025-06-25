//import message

const displayHome = (req, res) => {
  // generate home
  res.send("home");
};

const newMessageForm = (req, res) => {
  // make view generate form
  res.send("form");
};

const postMessage = (req, res) => {
  //res.redirect('/');
  res.send("message sent");
};

export { displayHome, newMessageForm, postMessage };
