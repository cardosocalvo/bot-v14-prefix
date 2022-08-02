const { GatewayIntentBits, Client, Collection } = require("discord.js")
const mongo = require("mongoose");
const config = require("./config.json")

const client = new Client({       intents: [ 
GatewayIntentBits.Guilds, 
GatewayIntentBits.GuildMessages,
GatewayIntentBits.MessageContent, 
GatewayIntentBits.GuildMembers,  
GatewayIntentBits.GuildVoiceStates, 
  ],
  ws: { properties: { browser: "Discord iOS" }} }); 

module.exports = client;
client.userdb = require("./database/user.js")

require("./handler")(client);
client.MongoConnect = () => mongo.connect(config.mongoURL)
client.login(config.token);