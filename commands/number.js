module.exports = {
	name: "nombre",
	title: "Activer/désactiver les nombres",
	arguments: [""],
	description: "Active ou désactive les réponses aux nombres. Quand un nombre est envoyé, le bot envoie le nombre entier suivant (si c'est un nombre décimal, il sera arrondi). Les mots personnalisés sont prioritaires à cette commande.",
	example: "",
	execute(msg, guild, args) {
		const fs = require("fs");
		const { EmbedBuilder } = require("discord.js");

		let data = JSON.parse(fs.readFileSync("data.json", "utf8"));

		if (data.servers[guild] == null) {
			data.servers[guild] = {};
		}

		let text = "Les réponses aux nombres sont ";
		if (data.servers[guild].isNumberEnabled == null) {
			data.servers[guild].isNumberEnabled = true;
			text += "activées";
		} else {
			delete data.servers[guild].isNumberEnabled;
			text += "désactivées";
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
