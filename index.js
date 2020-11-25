const Discord = require("discord.js");
const config = require("./config");
const fs = require("fs");
const client = new Discord.Client();

var json = JSON.parse(fs.readFileSync("words.json", 'utf8'));
var commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));

client.commands = new Discord.Collection();

for (var file of commandFiles) {
  var command = require("./commands/" + file);
  client.commands.set(command.name, command);
}

client.on("ready", () => {
  console.log("Connecté!")
  client.user.setActivity("finir les mots")
});

client.on("message", msg => {
  var chan = client.channels.cache.get(msg.channel.id);
  var guild = msg.guild.id;
  var args = msg.content.slice(2).split(" ");
  var command = args.shift().toLowerCase();
  var subMsg = msg.toString().split(" ");
  var processedMsg = subMsg[subMsg.length - 1].normalize("NFD").replace(/[\u0300-\u036f]|[^\w\s]/g, "").toLowerCase();

  if (processedMsg in json.mots && msg.author.id != client.user.id) {
    var delays = JSON.parse(fs.readFileSync("delays.json", 'utf8'));
    if (delays.serveurs[guild] != null && delays.serveurs[guild][1] != null) {
      var lastMessageDate = new Date(delays.serveurs[guild][1]);
      lastMessageDate.setMinutes(lastMessageDate.getMinutes() + delays.serveurs[guild][0]);
      var currentDate = new Date(Date.now());
      if (currentDate <= lastMessageDate) {
        return;
      }
    }
    chan.send(json.mots[processedMsg][Math.floor(Math.random() * json.mots[processedMsg].length)]);
    if (delays.serveurs[guild] != null) {
      delays.serveurs[guild][1] = new Date(Date.now());
      var newLastDate = JSON.stringify(delays);
      fs.writeFileSync("delays.json", newLastDate);
    }
  }

  if (msg.toString().toLowerCase().startsWith("o!") && client.commands.has(command)) {
    client.commands.get(command).execute(chan, guild, args);
  }
});

client.login(config.TOKEN);

