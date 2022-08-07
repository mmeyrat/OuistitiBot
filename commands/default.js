module.exports = {
	name: "defaut",
	title: "Activer/désactiver les mots",
	arguments: [""],
	description: "Active ou désactive les mots/suffixes par défaut.",
	example: "",
	execute(chan, guild, args) {
		const fs = require("fs");
		const { EmbedBuilder } = require('discord.js');

		let data = JSON.parse(fs.readFileSync("data.json", 'utf8'));

		if (data.servers[guild] == null) {
			data.servers[guild] = {};
		}

		let msg;
		if (data.servers[guild].isDefaultDisabled == null) {
			data.servers[guild].isDefaultDisabled = true;
			msg = "Les mots par défaut sont désactivés";
		} else {
			delete data.servers[guild].isDefaultDisabled;
			msg = "Les mots par défaut sont activés";
		}

		let json = JSON.stringify(data, null, "\t");
		fs.writeFileSync("data.json", json);

		let embed = new EmbedBuilder()
			.setColor("#AC8A4D")
			.setDescription(msg);
		chan.send({ embeds: [embed] });
	}
}
