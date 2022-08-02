const fs = require("fs")
const Discord = require("discord.js")
const client = require("./index")

module.exports = async (client) => {

//====Handler dos Comandos====\\

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.categories = fs.readdirSync(`./commands/`);

fs.readdirSync('./commands/').forEach(local => {

    const comandos = fs.readdirSync(`./commands/${local}`).filter(arquivo => arquivo.endsWith('.js'))

    for(let file of comandos) {
        let puxar= require(`../commands/${local}/${file}`)

        if(puxar.name) {
        client.commands.set(puxar.name, puxar)
        } 

        if(puxar.aliases && Array.isArray(puxar.aliases))
        puxar.aliases.forEach(x => client.aliases.set(x, puxar.name))
    } 
}); 

//====Handler dos eventos====\\

  fs.readdir(`././events/`, (erro, pasta) =>{
  pasta.forEach(subpasta =>{
fs.readdir(`././events/${subpasta}/`, (erro, arquivos) =>{
  arquivos.forEach(arquivo =>{       
  if(!arquivo.endsWith('.js')) return; require(`../events/${subpasta}/${arquivo}`); 
  });
    });
  });
});
};