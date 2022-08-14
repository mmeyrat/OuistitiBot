module.exports = {
	name: "effacer",
	title: "Effacer les données",
	arguments: [""],
	description: "Supprime toutes les données sauvegardées par le bot de ce serveur.",
	example: "",
	execute(msg, guild, args) {
		const fs = require("fs");
		const { EmbedBuilder } = require("discord.js");

		let data = JSON.parse(fs.readFileSync("data.json", "utf8"));

		if (data.servers[guild] == null) {
			sendMsg(msg, "Aucune donnée à supprimer");	
			return;
		}

		delete data.servers[guild];
		let json = JSON.stringify(data, null, "\t");
		fs.writeFileSync("data.json", json);

		sendMsg(msg, "Toutes les données ont été supprimées avec succès");
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
