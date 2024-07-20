const userService = require("../services/userService");

const createUser = async (req, res, next) => {
  try {
    const result = await userService.createUser(req.body);
    res.status(201).send(result);
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await userService.loginUser(email, password);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};
const getUser = async (req, res, next) => {
  try {
    const { email } = req.body;
    const result = await userService.getUser(email, password);
    res.status(200).send(result);
  } catch (error) {
    next(error);
  }
};
module.exports = {
  createUser: createUser,
  loginUser: loginUser,
  getUser: getUser,
};
