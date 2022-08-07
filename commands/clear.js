module.exports = {
	name: "effacer",
	title: "Effacer les données",
	arguments: [""],
	description: "Supprime toutes les données sauvegardées par le bot de ce serveur.",
	example: "",
	execute(chan, guild, args) {
		const fs = require("fs");
		const { EmbedBuilder } = require("discord.js");

		let data = JSON.parse(fs.readFileSync("data.json", "utf8"));

		if (data.servers[guild] == null) {
			let embed = new EmbedBuilder()
				.setColor("#AC8A4D")
				.setDescription("Aucune donnée à supprimer");
			chan.send({ embeds: [embed] });
			return;
		}

		delete data.servers[guild];
		let json = JSON.stringify(data, null, "\t");
		fs.writeFileSync("data.json", json);

		let embed = new EmbedBuilder()
			.setColor("#AC8A4D")
			.setDescription("Toutes les données ont été supprimées avec succès");
		chan.send({ embeds: [embed] });
	}
}
