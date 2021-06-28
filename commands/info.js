module.exports = {
	name: "info",
	title: "Informations",
	arguments: [""],
	description: "Affiche les informations générales relatives au bot.",
	async execute(chan, guild, args) {
		const Discord = require("discord.js");
		const fs = require("fs");
		const config = require("../config");
		const client = new Discord.Client();
		client.login(config.BOT_TOKEN);

		var data = JSON.parse(fs.readFileSync("data.json", 'utf8'));

		var embed = new Discord.MessageEmbed()
			.setColor("#AC8A4D")
			.setTitle("Informations générales")
			.setThumbnail((await client.users.fetch("725370669289963521")).displayAvatarURL())
			.setDescription("Un bot simple qui répond à vos messages pour vous embêter.");
		
		if (data.servers[guild] != null && data.servers[guild].delay != null) {
			embed.addField("Délai actuel :", data.servers[guild].delay + " minutes");
		}

		embed.addField("Page de présentation du bot :", "https://top.gg/bot/725370669289963521")
			.addField("Rejoindre le serveur Discord OuistitiBot officiel :", "https://discord.gg/3DbtncXpjC")
			.setFooter("Version 1.0");
		chan.send(embed);
	}
}
