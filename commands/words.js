module.exports = {
	name: "mots",
	title: "Afficher les mots/suffixes",
	arguments: [""],
	description: "Affiche la liste des mots pris en compte, ansi que leurs suffixes.",
    example: "",
	execute(chan, guild, args) {
		const Discord = require("discord.js");
		const fs = require("fs");

		var data = JSON.parse(fs.readFileSync("data.json", 'utf8'));

		var defaultField = [];
		var customField = [];
		var defaultCount = 0;
		var i = 0;

		for (var word in data.words) {
			defaultField[i] = word + " - " + data.words[word];
			defaultCount += data.words[word].length;
			i++;
		}

		if (data.servers[guild] && data.servers[guild].words != null) {
			i = 0;
			for (var word in data.servers[guild].words) {
				customField[i] = word + " - " + data.servers[guild].words[word];
				i++;
			}
		}
		
		var embed = new Discord.MessageEmbed()
			.setColor("#AC8A4D")
			.setTitle("Liste des mots/suffixes")
			.addField("Mots par défaut (" + defaultCount + " suffixes)", defaultField.join('\n'), true);

		if (customField.length > 0) {
			embed.addField("Mots personnalisés (" + data.servers[guild].wordCount + " suffixes)", customField.join('\n'), true);
		}   

		chan.send(embed);
	}
}
