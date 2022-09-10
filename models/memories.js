const mongoose = require("mongoose");

const memoriesscheme = mongoose.Schema(
  {
    title: {
      type: "string",
      required: true,
    },
    description: {
      type: "string",
      required: true,
    },
    image: {
      type: "string",
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "userinfo",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const memoriesdata = mongoose.model("memories", memoriesscheme);

module.exports = {
  memoriesdata,
};
