module.exports = {
	name: "blague",
	title: "Blague",   
	arguments: ["type"],
	description: "Envoie une blague du type précisé, parmi les types suivants `global`, `dev`, `dark`, `limit`, `beauf`, `blondes`. Si aucun type n'est précisé, une blague aléatoire est envoyée.",
	example: " global",
	async execute(msg, guild, args) {
		const config = require("../config");
		const fetch = require("node-fetch");
		const { EmbedBuilder } = require("discord.js");

		let url = "random";
		let types = ["global", "dev", "dark", "limit", "beauf", "blondes"];

		// check if the arguments are correct
		if (args[0] != null && !types.includes(args[0]) || args[1] != null) {
			sendMsg(msg, "Veuillez utiliser un type de blague existant (voir `o!aide`)");
			return;
		} else if (types.includes(args[0])) {
			url = `type/${args[0]}/random`;
		}

		let json = await fetch(`https://www.blagues-api.fr/api/${url}`, {
			headers: {
				"Authorization": `Bearer ${config.JOKE_TOKEN}`,
			}
		}).then((response) => {
			return response.json();
		});

		if (json.error != null) { // check if the api sent a correct response
			sendMsg(msg, "Jeton Blagues API incorrect");
			return;
		}

		let embed = new EmbedBuilder()
			.setColor("#AC8A4D")
			.setDescription(`${json.joke}\n*→ ${json.answer.trim()}*`)
			.setFooter({ text: json.type });
		
		msg.reply({
			embeds: [embed],
			allowedMentions: { repliedUser: false }
		});
	}
}

function sendMsg(msg, text) {
	const { EmbedBuilder } = require("discord.js");
	let embed = new EmbedBuilder()
		.setColor("#AC8A4D")
		.setDescription(text);
	
	msg.reply({
		embeds: [embed],
		allowedMentions: { repliedUser: false }
	});
}
