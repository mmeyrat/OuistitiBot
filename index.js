const fs = require("fs");
const config = require("./config");
const topgg = require("@top-gg/sdk");
const Discord = require("discord.js");

const topggApi = new topgg.Api(config.TOPGG_TOKEN);
const { Client, GatewayIntentBits, Partials, ActivityType } = require("discord.js");
const client = new Client({
	"intents": [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent
	],
	"partials": [Partials.Channel]
});
const status = [[ActivityType.Playing, "finir les mots"], 
				[ActivityType.Playing, "Donkey Kong"], 
				[ActivityType.Watching, "une banane"], 
				[ActivityType.Listening, "les gens se plaindre"], 
				[ActivityType.Listening, "- ille"]];

let commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
client.commands = new Discord.Collection();

for (let file of commandFiles) {
	let command = require("./commands/" + file);
	client.commands.set(command.name, command);
}

client.on("ready", () => {
	console.log("Connecté!");
	let isHelp = true;
	setInterval(() => {
		if(isHelp) { 
			client.user.setPresence({ activities: [{ name: "o!aide", type: ActivityType.Watching }] });
			isHelp = false;
		} else {
			let id = Math.floor(Math.random() * (status.length - 1) + 1);
			client.user.setPresence({ activities: [{ name: status[id][1], type: status[id][0] }] });
			isHelp = true;
		}
		
		topggApi.postStats({
			serverCount: client.guilds.cache.size
		})
		
		let data = JSON.parse(fs.readFileSync("data.json", "utf8"));
		const guildsIds = client.guilds.cache.map(guild => guild.id);
		
		for (let i = 0; i < guildsIds.length; i++) {
			if (data.servers[guildsIds[i]] != null && data.servers[guildsIds[i]].lastMsg != null) {
				let lastMessageDate = new Date(data.servers[guildsIds[i]].lastMsg);
				lastMessageDate.setMonth(lastMessageDate.getMonth() + 6);
				let currentDate = new Date(Date.now());
				
				if (currentDate >= lastMessageDate) {
					client.guilds.cache.get(guildsIds[i]).leave();
				}
			}
		}
	}, 60000 * 30);
});

client.on("messageCreate", msg => {
	if (!msg.author.bot && (msg.channel.type !== "dm")) {
		let channel = client.channels.cache.get(msg.channel.id);
		let guild = msg.guild.id;
		let args = msg.content.slice(2).split(" ");
		let command = args.shift().toLowerCase();
		let subMsg = msg.toString().split(" ");
		let processedMsg = subMsg[subMsg.length - 1].normalize("NFD").replace(/[\u0300-\u036f]|[\.\?\!\)]+$/g, "").toLowerCase();
		
		if (msg.toString().toLowerCase().startsWith("o!") && client.commands.has(command)) {
			client.commands.get(command).execute(msg, guild, args);
			
		} else {
			let data = JSON.parse(fs.readFileSync("data.json", "utf8"));
			
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
							channel.send(data.servers[guild].words[processedMsg][Math.floor(Math.random() * data.servers[guild].words[processedMsg].length)]);
						}
						return;
					}
					
					if (data.servers[guild].words != null && processedMsg in data.servers[guild].words) {
						wordArray = data.words[processedMsg].concat(data.servers[guild].words[processedMsg]);				
					}
				}
				
				channel.send(wordArray[Math.floor(Math.random() * wordArray.length)]);
			} else if (data.servers[guild] != null && data.servers[guild].words != null && processedMsg in data.servers[guild].words) {
				channel.send(data.servers[guild].words[processedMsg][Math.floor(Math.random() * data.servers[guild].words[processedMsg].length)]);
			} else if (data.servers[guild] != null && data.servers[guild].isNumberEnabled && processedMsg != "" && !isNaN(processedMsg)) {
				channel.send(String(Number(processedMsg) + 1));
			}
			
			if (data.servers[guild] != null && data.servers[guild].delay != null) {
				data.servers[guild]["lastMsg"] = new Date(Date.now());
				let newLastDate = JSON.stringify(data, null, "\t");
				fs.writeFileSync("data.json", newLastDate);
			}
		}
	}
});

client.login(config.BOT_TOKEN)
