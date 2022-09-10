const memoriesinfo = require("../models/memories");
const userinfo = require("../models/user");
const mongoose = require("mongoose");
exports.getAllmemories = async (req, res, next) => {
  let memories;
  try {
    memories = await memoriesinfo.memoriesdata.find().populate("user");
  } catch (err) {
    return console.log(err);
  }
  if (!memories) {
    return res.status(404).json({ message: "No Memories Found" });
  }
  return res.status(200).json({ memories });
};

exports.creatememories = async (req, res, next) => {
  const { title, description, image, user } = req.body;

  let existingUser;
  try {
    existingUser = await userinfo.userdata.findById(user);
  } catch (err) {
    return console.log(err);
  }
  if (!existingUser) {
    return res.status(400).json({ message: "Unable TO FInd User By This ID" });
  }

  const memories = new memoriesinfo.memoriesdata({
    title,
    description,
    image,
    user,
  });
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await memories.save({ session });
    existingUser.memories.push(memories);
    await existingUser.save({ session });
    await session.commitTransaction();
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err });
  }
  return res.status(200).json({ memories });
};

exports.updatememories = async (req, res, next) => {
  const { title, description, image } = req.body;
  const memoriesId = req.params.id;
  let memories;
  try {
    memories = await memoriesinfo.memoriesdata.findByIdAndUpdate(memoriesId, {
      title,
      description,
      image,
    });
  } catch (err) {
    return console.log(err);
  }
  if (!memories) {
    return res.status(500).json({ message: "Unable To Update The memories" });
  }
  return res.status(200).json({ memories });
};

exports.getbyId = async (req, res, next) => {
  const id = req.params.id;
  let memories;
  try {
    memories = await memoriesinfo.memoriesdata.findById(id);
  } catch (err) {
    return console.log(err);
  }
  if (!memories) {
    return res.status(404).json({ message: "No memories Found" });
  }
  return res.status(200).json({ memories });
};

exports.deletememories = async (req, res, next) => {
  const id = req.params.id;

  let memories;
  try {
    memories = await memoriesinfo.memoriesdata
      .findByIdAndRemove(id)
      .populate("user");
    await memories.user.memories.pull(memories);
    await memories.user.save();
  } catch (err) {
    console.log(err);
  }
  if (!memories) {
    return res.status(500).json({ message: "Unable To Delete" });
  }
  return res.status(200).json({ message: "Successfully Delete" });
};

exports.getbyUserId = async (req, res, next) => {
  const userId = req.params.id;
  let usermemories;
  try {
    usermemories = await userinfo.userdata
      .findById(userId)
      .populate("memories");
  } catch (err) {
    return console.log(err);
  }
  if (!usermemories) {
    return res.status(404).json({ message: "No memories Found" });
  }
  return res.status(200).json({ user: usermemories });
};
