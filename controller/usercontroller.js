const userinfo = require("../models/user");
const bcrypt = require("bcryptjs");
exports.getallUser = async (req, res, next) => {
  let users;
  try {
    users = await userinfo.userdata.find();
  } catch (err) {
    console.log(err);
  }
  if (!users) {
    res.status(404).json({ message: "no user found" });
  } else {
    res.status(200).json({ users });
  }
};

exports.signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  let existingUser;
  try {
    existingUser = await userinfo.userdata.findOne({ email });
  } catch (err) {
    return console.log(err);
  }
  if (existingUser) {
    return res
      .status(400)
      .json({ message: "User Already Exists! Login Instead" });
  }
  const hashedPassword = bcrypt.hashSync(password);

  const user = new userinfo.userdata({
    name,
    email,
    password: hashedPassword,
    memories: [],
  });

  try {
    await user.save();
  } catch (err) {
    return console.log(err);
  }
  return res.status(201).json({ user });
};

exports.login = async (req, res, next) => {
  const { email, password } = req.body;
  let existingUser;
  try {
    existingUser = await userinfo.userdata.findOne({ email });
  } catch (err) {
    return console.log(err);
  }
  if (!existingUser) {
    return res.status(404).json({ message: "Wrong credentials" });
  }
  const correctPassword = bcrypt.compareSync(password, existingUser.password);
  if (!correctPassword) {
    return res.status(400).json({ message: "Incorrect password!!!" });
  }
  return res
    .status(200)
    .json({ message: "Login successfull", user: existingUser });
};
