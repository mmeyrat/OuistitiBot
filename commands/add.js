module.exports = {
	name: "ajouter",
	title: "Ajouter un mot/suffixe",
	arguments: ["mot", "suffixe"],
	description: "Ajoute un mot et un suffixe à la liste des mots personnalisés (30 caractères maximum pour chacun). Il est possible d'ajouter un maximum de 20 mots ou suffixes (un mot peut avoir plusieurs suffixes).",
	execute(chan, guild, args) {
		const Discord = require("discord.js");
		const fs = require("fs");

		processedWord = args[0].normalize("NFD").replace(/[\u0300-\u036f]|[^\w\s]/g, "").toLowerCase();

		if (processedWord == null || args[1] == null || args[2] != null
			|| processedWord.length > 30 || args[1].length > 30 
			|| processedWord.length == 0 || args[1].length == 0) {
			var embed = new Discord.MessageEmbed()
				.setColor("#AC8A4D")
				.setDescription("Mot ou suffixe incorrect (voir `o!aide`)");
			chan.send(embed);
			return;
		}

		var data = JSON.parse(fs.readFileSync("data.json", 'utf8'));

		if (data.servers[guild] == null) {
			data.servers[guild] = {};
		}

		if (data.servers[guild].words == null) {
			data.servers[guild].words = {};
			data.servers[guild].wordCount = 0;
		}

		if (data.servers[guild].wordCount >= 20) {
			var embed = new Discord.MessageEmbed()
				.setColor("#AC8A4D")
				.setDescription("Nombre maximal de mots/suffixes atteint (maximum 20)");
			chan.send(embed);
			return;
		}

		if (data.servers[guild].words[processedWord] == null) {
			data.servers[guild].words[processedWord] = [];
		}

		if (processedWord in data.servers[guild].words && data.servers[guild].words[processedWord].includes(args[1])) {
			var embed = new Discord.MessageEmbed()
				.setColor("#AC8A4D")
				.setDescription("Cette combinaison a déjà été ajoutée");
			chan.send(embed);
			return;
		}

		data.servers[guild].words[processedWord].push(args[1]);
		data.servers[guild].wordCount++;
		var json = JSON.stringify(data, null, "\t");
		fs.writeFileSync("data.json", json);

		var embed = new Discord.MessageEmbed()
			.setColor("#AC8A4D")
			.setDescription("La combinaison **" + processedWord + "** - **" + args[1] + "** a été ajoutée");
		chan.send(embed);
	}
}
