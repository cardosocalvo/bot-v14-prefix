const client = require("../../index")
const Guild = require("../../database/guild.js")
const { EmbedBuilder } = require("discord.js")
const moment = require("moment")
const coldoown = new Set()

client.on("guildCreate", async guild => {
  let gCreate = await Guild.findOne({
    guildID: guild.id
  })
  if(!gCreate) {
    const newGuild = new Guild({ 
      guildID: guild.id,
      prefix: "!"
     })
    await newGuild.save();
  }
});
client.on("messageCreate", async (message) => {
  
    let prefix = (await Guild.findOne({ guildID: message.guild.id}))?.prefix || "!"
  
      if (message.author.bot || message.channel.type == 'dm') return;
  
       if (!message.content.toLowerCase().startsWith(prefix.toLowerCase())) return;
  
      if(!message.content.startsWith(prefix)) return;
      const args = message.content.slice(prefix.length).trim().split(/ +/g);
  
      let cmd = args.shift().toLowerCase()
      if(cmd.length === 0) return;
      let command = client.commands.get(cmd)
      if(!command) command = client.commands.get(client.aliases.get(cmd))    
        try {
      command.run(client, message, args)
  } catch (err) { 
 
     console.error('Erro:' + err);

          let erro = new EmbedBuilder()

          .setDescription(`O comando ${cmd} não existe no meu sistema, Caso ele exista no ${prefix}ajuda, reporte!`)
          message.reply({embeds: [erro]})
        }
        })