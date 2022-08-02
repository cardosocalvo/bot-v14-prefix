const { Schema, model } = require("mongoose");

const userset = new Schema({
  guildID: { type: String },
  prefix: { type: String, default: "!" },
 
});

module.exports = model("Guilds", userset);
