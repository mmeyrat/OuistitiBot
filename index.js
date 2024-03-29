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
				[ActivityType.Watching, "La Planète des singes"],
				[ActivityType.Listening, "les gens se plaindre"],
				[ActivityType.Listening, "Arctic Monkeys"]];

let commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
client.commands = new Discord.Collection();

// load all commands (contained in the files)
for (let file of commandFiles) {
	let command = require("./commands/" + file);
	client.commands.set(command.name, command); 
}

client.on("ready", () => {
	console.log("Connecté!");
	let isHelp = true;
	setInterval(() => {
		// alternate between help presence and custom presences
		if(isHelp) { 
			client.user.setPresence({ activities: [{ name: "o!aide", type: ActivityType.Watching }] });
			isHelp = false;
		} else {
			// choose a random custom presence to set
			let id = Math.floor(Math.random() * (status.length - 1) + 1);
			client.user.setPresence({ activities: [{ name: status[id][1], type: status[id][0] }] });
			isHelp = true;
		}
		
		// send the server count to Top.gg (to be displayed on the bot web page)
		topggApi.postStats({
			serverCount: client.guilds.cache.size
		}).catch((error) => {
			console.error(error);
		});
		
		let data = JSON.parse(fs.readFileSync("data.json", "utf8"));
		const guildsIds = client.guilds.cache.map(guild => guild.id);
		
		for (let i = 0; i < guildsIds.length; i++) { // checks all servers that used the bot
			if (data.servers[guildsIds[i]] != null && data.servers[guildsIds[i]].lastMsg != null) { // check if the bot has send a message on that server
				let lastMessageDate = new Date(data.servers[guildsIds[i]].lastMsg);
				let monthNb = 4;
				
				lastMessageDate.setMonth(lastMessageDate.getMonth() + monthNb);
				let currentDate = new Date(Date.now());
				
				if (currentDate >= lastMessageDate) {
					client.guilds.cache.get(guildsIds[i]).leave(); // leave the server if the last message is 4 months old
				}
			}
		}
	}, 60000 * 30); // execute every 30 minutes
});

client.on("messageCreate", msg => {
	if (!msg.author.bot && (msg.channel.type !== "dm")) {
		let channel = client.channels.cache.get(msg.channel.id);
		let args = msg.content.slice(2).split(" ");
		let command = args.shift().toLowerCase();
		let subMsg = msg.toString().split(" ");
		let processedMsg = subMsg[subMsg.length - 1].normalize("NFD").replace(/[\u0300-\u036f]|[\.\?\!\)]+$/g, "").toLowerCase(); // keep the last word and remove accents, cedillas...

		if (args.length > 1) { // skip the first argument 
			let isQuote = false;
			let id = -1;
			
			// check in the argument array if an argument starts with a double quote and if a following argument end with another double quote
			for (let i = 1; i < args.length; i++) {
				let currentArg = args[i]; 

				if (isQuote) { 
					args[id] += ` ${args[i]}`; // concat arguments
					delete args[i];
				}

				if (!isQuote && currentArg.startsWith("\"")) {
					isQuote = true;
					id = i;
				}
				
				if (isQuote && currentArg.endsWith("\"")) {
					isQuote = false;
					args[id] = args[id].replaceAll("\"", ""); // remove the double quotes
				}
			}

			args = args.filter(arg => arg != null) // remove deleted arguments
		}
		
		if (msg.toString().toLowerCase().startsWith("o!") && client.commands.has(command)) {
			client.commands.get(command).execute(msg, msg.guild.id, args); // execute a command if one is found
		} else {
			let data = JSON.parse(fs.readFileSync("data.json", "utf8"));
			let guild = data.servers[msg.guild.id];
			
			if (guild != null && guild.delay != null && guild.lastMsg != null) { // check if a delay has been set
				let lastMessageDate = new Date(guild.lastMsg);
				
				lastMessageDate.setMinutes(lastMessageDate.getMinutes() + guild.delay);
				let currentDate = new Date(Date.now());
				
				if (currentDate <= lastMessageDate) { // check if the last message is old enough
					return;
				}
			}
			
			if (processedMsg in data.words) { // check if the message is a default word
				let wordArray = data.words[processedMsg];
				
				if (guild != null) {
					if (guild.isDefaultDisabled != null) { // check if default words are disabled
						if (guild.words != null && processedMsg in guild.words) {
							// select a random default response
							channel.send(guild.words[processedMsg][Math.floor(Math.random() * guild.words[processedMsg].length)]);
						}

						return;
					}
					
					if (guild.words != null && processedMsg in guild.words) {
						// add both default and custom responses, then select a random one
						wordArray = data.words[processedMsg].concat(guild.words[processedMsg]);	
					}
				}

				channel.send(wordArray[Math.floor(Math.random() * wordArray.length)]); // send the corresponding response
			} else if (guild != null && guild.words != null && processedMsg in guild.words) { // check if a corresponding custom response exist
				// select a random custom response
				channel.send(guild.words[processedMsg][Math.floor(Math.random() * guild.words[processedMsg].length)]);		
			} else if (guild != null && guild.isNumberEnabled && processedMsg != "" && !isNaN(processedMsg)) { // check if numbers are enabled
				channel.send(String(Math.round(Number(processedMsg) + 1))); // send the rounded next int 
			}
			
			// store the message's date
			if (guild != null) {
				guild["lastMsg"] = new Date(Date.now());
				let newLastDate = JSON.stringify(data, null, "\t");
				fs.writeFileSync("data.json", newLastDate);
			}
		}
	}
});

client.login(config.BOT_TOKEN)
