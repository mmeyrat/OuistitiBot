const Discord = require("discord.js");
const fs = require("fs");
const config = require("./config");
const topgg = require('@top-gg/sdk');
const client = new Discord.Client();
const topggApi = new topgg.Api(config.TOPGG_TOKEN);

let commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
client.commands = new Discord.Collection();

const status = [["PLAYING", "finir les mots"], ["PLAYING", "Donkey Kong"], ["WATCHING", "une banane"], ["LISTENING", "les gens se plaindre"], ["LISTENING", "- ille"]];

for (let file of commandFiles) {
	let command = require("./commands/" + file);
	client.commands.set(command.name, command);
}

client.on("ready", () => {
	console.log("Connecté!");
	let isHelp = true;
	setInterval(() => {
		if(isHelp) { 
			client.user.setActivity("o!aide", { type: "WATCHING" });
			isHelp = false;
		} else {
			let id = Math.floor(Math.random() * (status.length - 1) + 1);
			client.user.setActivity(status[id][1], { type: status[id][0] });
			isHelp = true;
		}
		topggApi.postStats({
			serverCount: client.guilds.cache.size
		})
	}, 60000 * 30);
});

client.on("message", msg => {
	if (!msg.author.bot && (msg.channel.type !== "dm")) {
		let chan = client.channels.cache.get(msg.channel.id);
		let guild = msg.guild.id;
		let args = msg.content.slice(2).split(" ");
		let command = args.shift().toLowerCase();
		let subMsg = msg.toString().split(" ");
		let processedMsg = subMsg[subMsg.length - 1].normalize("NFD").replace(/[\u0300-\u036f]|[^\w\s]/g, "").toLowerCase();
		
		if (msg.toString().toLowerCase().startsWith("o!") && client.commands.has(command)) {
			client.commands.get(command).execute(chan, guild, args);
			
		} else {
			let data = JSON.parse(fs.readFileSync("data.json", 'utf8'));
			
			if (data.servers[guild] != null && data.servers[guild].delay != null && data.servers[guild].lastMsg != null) { // check if there's delay
				let lastMessageDate = new Date(data.servers[guild].lastMsg);
				lastMessageDate.setMinutes(lastMessageDate.getMinutes() + data.servers[guild].delay);
				let currentDate = new Date(Date.now());
				if (currentDate <= lastMessageDate) {
					return;
				}
			}
			
			if (processedMsg in data.words) { // check if msg is a default word
				let wordArray = data.words[processedMsg];
				if (data.servers[guild] != null) {
					if (data.servers[guild].isDefaultDisabled != null) {
						if (data.servers[guild].words != null && processedMsg in data.servers[guild].words) {
							chan.send(data.servers[guild].words[processedMsg][Math.floor(Math.random() * data.servers[guild].words[processedMsg].length)]);
						}
						return;
					}
					if (data.servers[guild].words != null && processedMsg in data.servers[guild].words) {
						wordArray = data.words[processedMsg].concat(data.servers[guild].words[processedMsg]);				
					}
				}
				chan.send(wordArray[Math.floor(Math.random() * wordArray.length)]);
			} else if (data.servers[guild] != null && data.servers[guild].words != null && processedMsg in data.servers[guild].words) {
				chan.send(data.servers[guild].words[processedMsg][Math.floor(Math.random() * data.servers[guild].words[processedMsg].length)]);
			}
			
			if (data.servers[guild] != null && data.servers[guild].delay != null) {
				data.servers[guild]["lastMsg"] = new Date(Date.now());
				let newLastDate = JSON.stringify(data, null, "\t");
				fs.writeFileSync("data.json", newLastDate);
			}
		}
	}
});

client.login(config.BOT_TOKEN);
