module.exports = {
	name: "nombre",
	title: "Activer/désactiver les nombres",
	arguments: [""],
	description: "Active ou désactive les réponses aux nombres. Quand un nombre est envoyé, le bot envoie le nombre suivant.",
	example: "",
	execute(msg, guild, args) {
		const fs = require("fs");
		const { EmbedBuilder } = require("discord.js");

		let data = JSON.parse(fs.readFileSync("data.json", "utf8"));

		if (data.servers[guild] == null) {
			data.servers[guild] = {};
		}

		let text;
		if (data.servers[guild].isNumberEnabled == null) {
			data.servers[guild].isNumberEnabled = true;
			text = "Les réponses aux nombres sont activées";
		} else {
			delete data.servers[guild].isNumberEnabled;
			text = "Les réponses aux nombres sont désactivées";
		}

		let json = JSON.stringify(data, null, "\t");
		fs.writeFileSync("data.json", json);

		let embed = new EmbedBuilder()
			.setColor("#AC8A4D")
			.setDescription(text);
		
		msg.reply({
			embeds: [embed],
			allowedMentions: { repliedUser: false }
		});
	}
}
