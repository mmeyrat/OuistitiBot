module.exports = {
	name: "defaut",
	title: "Activer/désactiver",
	arguments: [""],
	description: "Active ou désactive les mots/suffixes par défaut.",
	execute(chan, guild, args) {
		const Discord = require("discord.js");
		const fs = require("fs");

		var data = JSON.parse(fs.readFileSync("data.json", 'utf8'));

		if (data.servers[guild] == null) {
			data.servers[guild] = {};
		}

        var msg;
		if (data.servers[guild].isDefaultDisabled == null) {
            data.servers[guild].isDefaultDisabled = true;
            msg = "Les mots par défaut sont désactivés";
        } else {
            delete data.servers[guild].isDefaultDisabled;
            msg = "Les mots par défaut sont activés";
        }

		var json = JSON.stringify(data, null, "\t");
		fs.writeFileSync("data.json", json);

		var embed = new Discord.MessageEmbed()
			.setColor("#AC8A4D")
			.setDescription(msg);
		chan.send(embed);
	}
}
