
const { decode, verify } = require('jsonwebtoken');
const logger = require("../config/logger");
const { formatError } = require("../utils/error.util");

const NAMESPACE = "Access-Control Middleware";

const verifyToken = async (
  req,
  res,
  next
) => {
  try {
    const token = req.headers["skon-auth-token"];
    if (!token) {
      return res.status(401).send(formatError("Access denied"));
    }
    const token_verified = await verify(
      token,
      process.env.API_SECRET
    );
    if (token_verified) {
      const decoded = await decode(token);
      req.body.api_user = decoded;

      next();
    } else {
      return res.status(401).send(formatError("Access denied"));
    }
  } catch (err) {
    logger.error(NAMESPACE, "Token Error", err);
    return res.status(401).send(formatError("Access denied"));
  }
};

const adminOnly = async (
  req,
  res,
  next
) => {
  try {
    const user = req.body.api_user;
    const role = user.role;
    if (role !== "admin") {
      return res.status(401).send(formatError("Access denied"));
    }
    next();
  } catch (err) {
    logger.error(NAMESPACE, "Admin middleware error", err);
    return res.status(401).send(formatError("Access denied"));
  }
};

const clubOnly = async (
  req,
  res,
  next
) => {
  try {
    const user = req.body.api_user;
    const role = user.role;
    if (role !== "member") {
      return res.status(401).send(formatError("Access denied"));
    }
    next();
  } catch (err) {
    logger.error(NAMESPACE, "Admin middleware error", err);
    return res.status(401).send(formatError("Access denied"));
  }
};


module.exports = {
  verifyToken, 
  adminOnly,
  clubOnly
}