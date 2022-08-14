module.exports = {
	name: "enlever",
	title: "Enlever un mot/suffixe",
	arguments: ["mot", "suffixe"],
	description: "Enlève un mot précédemment ajouté de la liste des mots personnalisés.",
	example: " voila ctée",
	execute(msg, guild, args) {
		const fs = require("fs");

		if (args[0] == null || args[1] == null || args[2] != null) {
			sendMsg(msg, "Nombre d'arguments incorrect (voir `o!aide`)");
			return;
		}

		let processedWord = args[0].normalize("NFD").replace(/[\u0300-\u036f]|[\.\?\!\)]+$/g, "").toLowerCase();

		if (processedWord == null || processedWord.length > 30 || args[1].length > 30 || processedWord.length == 0) {
			sendMsg(msg, "Mot ou suffixe incorrect (voir `o!aide`)");
			return;
		}

		let data = JSON.parse(fs.readFileSync("data.json", "utf8"));

		if (data.servers[guild] == null) {
			data.servers[guild] = {};
		}

		if (data.servers[guild].words == null) {
			data.servers[guild].words = {};
			data.servers[guild].wordCount = 0;
		}

		if (data.servers[guild].wordCount <= 0) {
			sendMsg(msg, "Aucun mot/suffixe à enlever");
			return;
		}

		if (args[0] in data.servers[guild].words) {
			let word = data.servers[guild].words[args[0]];
			if (word.includes(args[1])) {
				for(let i = 0; i < word.length; i++){ 
					if (word[i] == args[1]) { 
						data.servers[guild].words[args[0]].splice(i, 1);
						data.servers[guild].wordCount--;
					}
				}
			} else {
				sendMsg(msg, "Ce suffixe n'existe pas");
				return;
			}

			if (data.servers[guild].words[args[0]].length == 0) {
				delete data.servers[guild].words[args[0]];
			}
		} else {
			sendMsg(msg, "Ce mot n'existe pas");
			return;
		}
		
		let json = JSON.stringify(data, null, "\t");
		fs.writeFileSync("data.json", json);

		sendMsg(msg, `La combinaison **${args[0]}** - **${args[1]}** a été enlevée`);
	}
}

function sendMsg(msg, text) {
	const { EmbedBuilder } = require("discord.js");
	let embed = new EmbedBuilder()
		.setColor("#AC8A4D")
		.setDescription(text);
	
	msg.reply({
		embeds: [embed],
		allowedMentions: { repliedUser: false }
	});
}
