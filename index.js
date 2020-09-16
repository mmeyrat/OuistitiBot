const Discord = require("discord.js");
const config = require("./config");
const fs = require("fs");
const client = new Discord.Client();

var json = JSON.parse(fs.readFileSync("mots.json", 'utf8'));
var commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));

var test = 0;

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
  var args = msg.content.slice(1).split(" ");
	var command = args.shift().toLowerCase();

	if (msg.toString().startsWith("$") && client.commands.has(command)) {
		client.commands.get(command).execute(chan, args);
  }
  else {
    var subMsg = msg.toString().split(" ");
    var processedMsg = subMsg[subMsg.length - 1].normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

    if (processedMsg in json.mots && msg.author.id != client.user.id) {    
      chan.send(json.mots[processedMsg][Math.floor(Math.random() * json.mots[processedMsg].length)]);
    }
    chan.send(test);
  }
});

client.login(config.TOKEN);

