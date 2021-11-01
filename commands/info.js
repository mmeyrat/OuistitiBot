module.exports = {
	name: "info",
	title: "Informations",
	arguments: [""],
	description: "Affiche les informations générales relatives au bot.",
	example: "",
	async execute(chan, guild, args) {
		const Discord = require("discord.js");
		const fs = require("fs");
		const config = require("../config");
		const client = new Discord.Client();
		client.login(config.BOT_TOKEN);

		let data = JSON.parse(fs.readFileSync("data.json", 'utf8'));

		let embed = new Discord.MessageEmbed()
			.setColor("#AC8A4D")
			.setTitle("Informations générales")
			.setThumbnail((await client.users.fetch("725370669289963521")).displayAvatarURL())
			.setDescription("Un bot Discord simple qui répond à des messages précis pour mettre de l'ambiance dans vos serveurs.");
		
		if (data.servers[guild] != null) {
			if (data.servers[guild].delay != null) {
				embed.addField("Délai actuel :", data.servers[guild].delay + " minutes");
			}
			if (data.servers[guild].isDefaultDisabled) {
				embed.addField("Mots par défaut :", " désactivés");
			}
		}

		let links = "• Inviter le bot : \nhttp://is.am/4m3p \n"
			+ "• Page de présentation du bot : \nhttps://top.gg/bot/725370669289963521 \n"
			+ "• Rejoindre le serveur Discord OuistitiBot officiel : \nhttps://discord.gg/3DbtncXpjC \n"
			+ "• Voter pour le bot : \nhttps://top.gg/bot/725370669289963521/vote"

		embed.addField("Liens utiles :", links)
			.setFooter("Version 2.1");
		chan.send(embed);
	}
}
