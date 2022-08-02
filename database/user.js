const { Schema, model } = require("mongoose");

const userset = new Schema({
  userID: { type: String },
  economia: {
      money: { type: Number, default: 0 },
  }
});

module.exports = model("Usuários", userset);
