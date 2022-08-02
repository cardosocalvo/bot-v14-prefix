const client = require("../../index");
const Discord = require('discord.js');
const Guild = require("../../Database/guild.js")

client.on("messageCreate", async (message) => {
  
     

   const prefix = (await Guild.findOne({ guildID: message.guild.id}))?.prefix || "!"
  
  if(message.author.bot) return;
  if(!message.guild) return;
  
  if(message.content == `<@${client.user.id}>` || message.content == `<@!${client.user.id}>`){
  
      const menção = new Discord.EmbedBuilder()
    .setDescription(`Olá ${message.author}! Meu prefixo neste servidor é \`${prefix}\`, para ver o que eu posso fazer, use \`${prefix}ajuda\`!`)
    .setFooter({text: `${message.author.tag}`, iconURL: message.author.displayAvatarURL() })

        message.reply({embeds: [menção]})
  }
});  
