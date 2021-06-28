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
    var data = JSON.parse(fs.readFileSync("data.json", 'utf8'));

    if (data.servers[guild] != null && data.servers[guild].lastMsg != null) { // check if there's delay
      var lastMessageDate = new Date(data.servers[guild].lastMsg);
      lastMessageDate.setMinutes(lastMessageDate.getMinutes() + data.servers[guild].delay);
      var currentDate = new Date(Date.now());

      if (currentDate <= lastMessageDate) {
        return;
      }
    }

    chan.send(json.mots[processedMsg][Math.floor(Math.random() * json.mots[processedMsg].length)]);

    if (data.servers[guild] != null) {
      data.servers[guild]["lastMsg"] = new Date(Date.now());
      var newLastDate = JSON.stringify(data, null, "\t");
      fs.writeFileSync("data.json", newLastDate);
    }
  }

  if (msg.toString().toLowerCase().startsWith("o!") && client.commands.has(command)) {
    client.commands.get(command).execute(chan, guild, args);
  }
});

client.login(config.BOT_TOKEN);

