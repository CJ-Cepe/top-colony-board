import { getRandomRole, generateAntName } from "../utils/antUtils.js";

const ensureIdentity = (req, res, next) => {
  if (!req.session.role || !req.session.name) {
    const role = getRandomRole();
    const name = generateAntName(role);
    req.session.role = role;
    req.session.name = name;
  }
  next();
};

export { ensureIdentity };
