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
		let author = (await client.users.fetch("266707645803659274"));

		let embed = new EmbedBuilder()
			.setColor("#AC8A4D")
			.setTitle("Informations générales")
			.setAuthor({ name: `Crée par ${author.username}`, iconURL: author.displayAvatarURL(), url: `https://discord.com/users/${author.id}` })
			.setThumbnail((await client.users.fetch("1007028483505012807")).displayAvatarURL())
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

		let links = "• [Inviter le bot](https://discord.com/api/oauth2/authorize?client_id=1007028483505012807&permissions=534723951680&scope=bot) \n"
			+ "• [Voter pour le bot](https://top.gg/bot/1007028483505012807/vote) \n"			
			+ "• [Le serveur Discord OuistitiBot](https://discord.gg/3DbtncXpjC) \n"
			+ "• [La page GitHub](https://github.com/mmeyrat/OuistitiBot) \n"
			+ "• [Le site Blagues API](https://www.blagues-api.fr/)"

		embed.addFields({ name: "Liens utiles :", value: links })
			.setFooter({ text: "Version 2.1" });

		msg.reply({
			embeds: [embed],
			allowedMentions: { repliedUser: false }
		});
	}
}
