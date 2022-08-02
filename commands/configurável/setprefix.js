const Discord = require('discord.js');
const Guild = require("../../database/guild.js");
const { PermissionsBitField } = require('discord.js')

module.exports = {
  name: 'setprefix',
  aliases: ['prefixo', 'setprefixo', 'prefix'],
  run: async (client, message, args) => {

    let servidor = await Guild.findOne({
      guildID: message.guild.id
    });

    if (!servidor) {
      const newGuild = new Guild({
        guildID: message.guild.id,
        prefix: '!'
      });
      await newGuild.save();

      servidor = await Guild.findOne({ guildID: message.guild.id });
    }
    if (!message.member.permissions.has(PermissionsBitField.Flags.ManageGuild)) return message.reply(`${message.author} » Parece que você não tem permissões necessária`)
    const prefix = args[0];

    if (!prefix)
      return message.reply(
        `Você não digitou o novo prefix, vou continuar respondendo com \`${prefix}\``
      );

    message.reply(
      `${message.author}, meu prefixo foi trocado com sucesso para \`${prefix}\``
    );

    await Guild.findOneAndUpdate(
      {
        guildID: message.guild.id
      },
      {
        $set: {
          prefix: prefix
        }
      }
    );
  }
}; 
