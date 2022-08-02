const client = require("../../index");
const mongo = require("mongoose")
const { ActivityType } = require('discord.js')

client.on("ready", () =>{
 
let status = [
      `template feito por cardoso`
    ],
    i = 0
  setInterval(() => {
    client.user.setActivity(`${status[i++ % status.length]}`,{
        type: ActivityType.Playing
      })
  }, 60000);

client.user.setStatus('online')
  mongo.connection.on('connected', () =>{
  console.log('mongodb on')
})
  client.MongoConnect()

  console.log(`bot on`)
})