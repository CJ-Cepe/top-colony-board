import { assignNewAntIdentityToSession } from "../utils/antUtils.js";

const ensureIdentity = (req, res, next) => {
  if (!req.session.role || !req.session.name) {
    assignNewAntIdentityToSession(req.session);
  }
  next();
};

export { ensureIdentity };
