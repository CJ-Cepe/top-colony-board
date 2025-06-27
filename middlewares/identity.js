import {
  getRandomRole,
  generateAntName,
  getTopics,
} from "../utils/antUtils.js";

const ensureIdentity = (req, res, next) => {
  if (!req.session.role || !req.session.name) {
    const role = getRandomRole();
    const name = generateAntName(role);
    const topics = getTopics(role);
    req.session.role = role;
    req.session.name = name;
    req.session.topics = topics;
  }
  next();
};

export { ensureIdentity };
