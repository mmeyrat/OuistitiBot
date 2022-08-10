module.exports = {
	name: "mots",
	title: "Afficher les mots/suffixes",
	arguments: [""],
	description: "Affiche la liste des mots pris en compte, ansi que leurs suffixes.",
	example: "",
	execute(msg, guild, args) {
		const fs = require("fs");
		const { EmbedBuilder } = require("discord.js");

		let data = JSON.parse(fs.readFileSync("data.json", "utf8"));

		let defaultField = [];
		let customField = [];
		let defaultCount = 0;
		let i = 0;

		for (let word in data.words) {
			defaultField[i] = `${word} - ${data.words[word]}`;
			defaultCount += data.words[word].length;
			i++;
		}

		if (data.servers[guild] && data.servers[guild].words != null) {
			i = 0;
			for (let word in data.servers[guild].words) {
				customField[i] = `${word} - ${data.servers[guild].words[word]}`;
				i++;
			}
		}
		
		let embed = new EmbedBuilder()
			.setColor("#AC8A4D")
			.setTitle("Liste des mots/suffixes")
			.addFields({ name: `Mots par défaut (${defaultCount})`, value: defaultField.join("\n"), inline: true });

		if (customField.length > 0) {
			embed.addFields({ name: `Mots personnalisés (${data.servers[guild].wordCount}/30)`, value: customField.join("\n"), inline: true });
		}   

		msg.reply({
			embeds: [embed],
			allowedMentions: { repliedUser: false }
		});
	}
}
