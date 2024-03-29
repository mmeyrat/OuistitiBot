module.exports = {
	name: "delai",
	title: "Délai",
	arguments: ["minutes"],
	description: "Définit le délai en minutes entre chaque message. Le délai doit être un nombre compris entre 0 et 10 000 (inclus).",
	example: " 60",
	execute(msg, guild, args) {
		const fs = require("fs");
		const { EmbedBuilder } = require("discord.js");

		// check if the arguments are correct
		if (args[0] == null || args[1] != null || isNaN(args[0]) || args[0] < 0 || args[0] > 10000) {
			let embed = new EmbedBuilder()
				.setColor("#AC8A4D")
				.setDescription("Veuillez préciser un délai correct en minutes (voir `o!aide`)");
			msg.send({ embeds: [embed] });
			return;
		}

		let data = JSON.parse(fs.readFileSync("data.json", "utf8"));

		if (data.servers[guild] == null) {
			data.servers[guild] = {};
		}

		if (args[0] != 0) {
			data.servers[guild].delay = Number(args[0]); // store the delay
		} else if (data.servers[guild].delay != null) {
			delete data.servers[guild].delay; // remove the delay if equal to 0
		}

		let json = JSON.stringify(data, null, "\t");
		fs.writeFileSync("data.json", json);

		let embed = new EmbedBuilder()
			.setColor("#AC8A4D")
			.setDescription(`Il y a maintenant **${Number(args[0])}** minutes d'attente entre chaque message`);
		
		msg.reply({
			embeds: [embed],
			allowedMentions: { repliedUser: false }
		});
	}
}
