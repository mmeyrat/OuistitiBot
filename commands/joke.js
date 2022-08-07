module.exports = {
	name: "blague",
	title: "Blague",   
	arguments: ["type"],
	description: "Envoie une blague du type précisé, parmi les types suivants `global`, `dev`, `dark`, `limit`, `beauf`, `blondes`. Si aucun type n'est précisé, une blague aléatoire est envoyée.",
	example: " global",
	async execute(chan, guild, args) {
		const config = require("../config");
		const fetch = require("node-fetch");
		const { EmbedBuilder } = require("discord.js");

		let url = "random";
		let types = ["global", "dev", "dark", "limit", "beauf", "blondes"];

		if (args[0] != null && !types.includes(args[0]) || args[1] != null) {
			let embed = new EmbedBuilder()
				.setColor("#AC8A4D")
				.setDescription("Veuillez utiliser un type de blague existant (voir `o!aide`)");
			chan.send({ embeds: [embed] });
			return;
		} else if (types.includes(args[0])) {
			url = "type/" + args[0] + "/random";
		}

		let json = await fetch("https://www.blagues-api.fr/api/" + url, {
			headers: {
				"Authorization": "Bearer " + config.JOKE_TOKEN,
			}
		}).then(response => response.json());

		let embed = new EmbedBuilder()
			.setColor("#AC8A4D")
			.setDescription(json.joke + "\n*→ " + json.answer.trim() + "*")
			.setFooter({ text: json.type });
		chan.send({ embeds: [embed] });
	}
}
