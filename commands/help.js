module.exports = {
	name: "aide",
	title: "Aide",
	arguments: [""],
	description: "Affiche l'aide.",
	example: "",
	async execute(msg, guild, args) {
		const fs = require("fs");
		const { EmbedBuilder } = require("discord.js");

		let embed = new EmbedBuilder()
			.setColor("#AC8A4D")
			.setTitle("Liste des commandes");
		let commandList = [];

		// load every command in an array
		fs.readdirSync("./commands").forEach(file => {
			let command = require("./" + file);
			commandList.push(command);
		});

		// sort alphabetically the commands by their titles
		commandList.sort((a, b) => a.title.localeCompare(b.title))

		commandList.forEach(command => {
			let nameAndArgs = `\`o!${command.name}`;
			for (let i = 0; i < command.arguments.length; i++) {
				if (command.arguments[i] != "") {
					nameAndArgs += ` <${command.arguments[i]}>`;
				}
			}
			embed.addFields({ name: `• ${command.title}`, value: `${nameAndArgs}\` : ${command.description}\n(Exemple : \`o!${command.name}${command.example}\`)`});
		});

		msg.reply({
			embeds: [embed],
			allowedMentions: { repliedUser: false }
		});
	}
}
