const authRoute = require("express").Router();
const { registerUser, loginUser } = require("../controllers/auth.controller");

// register a user
authRoute.post("/register", async (req, res) => {
  let { message, status, error } = await registerUser(req.body);
  if (status === "Error") return res.status(500).send({ message });
  res.status(201).send(message);
});

// Login a user
authRoute.post("/login", async (req, res) => {
  let response = await loginUser(req.body);
  if (response.status === "Error")
    return res.status(500).send(response.message);
  res.status(200).json(response);
});

module.exports = authRoute;
