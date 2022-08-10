module.exports = {
	name: "info",
	title: "Informations",
	arguments: [""],
	description: "Affiche les informations générales relatives au bot.",
	example: "",
	async execute(msg, guild, args) {
		const fs = require("fs");
		const config = require("../config");
		const { Client, GatewayIntentBits, EmbedBuilder } = require("discord.js");
		const client = new Client({ "intents": [GatewayIntentBits.Guilds]});
		client.login(config.BOT_TOKEN);

		let data = JSON.parse(fs.readFileSync("data.json", "utf8"));

		let embed = new EmbedBuilder()
			.setColor("#AC8A4D")
			.setTitle("Informations générales")
			.setAuthor({ name: "Crée par Aruten", iconURL: (await client.users.fetch("266707645803659274")).displayAvatarURL(), url: "https://discord.com/users/266707645803659274/" })
			.setThumbnail((await client.users.fetch("725370669289963521")).displayAvatarURL())
			.setDescription("Un bot Discord simple qui répond à des messages précis pour mettre de l'ambiance dans vos serveurs.");
		
		if (data.servers[guild] != null) {
			if (data.servers[guild].delay != null) {
				embed.addFields({ name: "Délai actuel :", value: `data.servers[guild].delay minutes` });
			}
			if (data.servers[guild].isDefaultDisabled) {
				embed.addFields({ name: "Mots par défaut :", value: " désactivés" });
			}
			if (data.servers[guild].isNumberEnabled) {
				embed.addFields({ name: "Réponses aux nombres :", value: " activées" });
			}
		}

		let links = "• Inviter le bot : \nhttp://is.am/4m3p \n"
			+ "• Page de présentation du bot : \nhttps://top.gg/bot/725370669289963521 \n"
			+ "• Rejoindre le serveur Discord OuistitiBot : \nhttps://discord.gg/3DbtncXpjC \n"
			+ "• Voter pour le bot : \nhttps://top.gg/bot/725370669289963521/vote"

		embed.addFields({ name: "Liens utiles :", value: links })
			.setFooter({ text: "Version 2.1" });

		msg.reply({
			embeds: [embed],
			allowedMentions: { repliedUser: false }
		});
	}
}
