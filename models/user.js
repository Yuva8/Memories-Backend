const mongoose = require("mongoose");

const userschema = mongoose.Schema(
  {
    name: {
      type: "string",
      required: true,
    },
    email: {
      type: "string",
      required: true,
      unique: true,
    },
    password: {
      type: "string",
      required: true,
    },
    memories: [
      {
        type: mongoose.Types.ObjectId,
        ref: "memories",
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const userdata = mongoose.model("userinfo", userschema);

module.exports = {
  userdata,
};
