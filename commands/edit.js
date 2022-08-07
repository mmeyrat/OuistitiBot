module.exports = {
	name: "modifier",
	title: "Modifier un mot/suffixe",
	arguments: ["ancien mot", "ancien suffixe", "nouveau suffixe"],
	description: "Modifie un mot précédemment ajouté de la liste des mots personnalisés.",
	example: " voila cto ctee",
	execute(chan, guild, args) {
		const fs = require("fs");
		
		if (args[0] == null || args[1] == null || args[2] == null || args[3] != null) {
			sendMsg(chan, "Nombre d'arguments incorrect (voir `o!aide`)");
			return;
		}

		let processedWord = args[0].normalize("NFD").replace(/[\u0300-\u036f]|[\.\?\!\)]+$/g, "").toLowerCase();

		if (processedWord == null || processedWord.length > 30 || args[1].length > 30 || args[2].length > 30 || processedWord.length == 0) {
			sendMsg(chan, "Mot ou suffixe incorrect (voir `o!aide`)");
			return;
		}

		let data = JSON.parse(fs.readFileSync("data.json", 'utf8'));

		if (data.servers[guild] == null) {
			data.servers[guild] = {};
		}

		if (data.servers[guild].words == null) {
			data.servers[guild].words = {};
			data.servers[guild].wordCount = 0;
		}

		if (data.servers[guild].wordCount <= 0) {
			sendMsg(chan, "Aucun mot/suffixe à enlever");
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
				sendMsg(chan, "Ce suffixe n'existe pas");
				return;
			}

			if (data.servers[guild].words[args[0]].length == 0) {
				delete data.servers[guild].words[args[0]];
			}
		} else {
			sendMsg(chan, "Ce mot n'existe pas");
			return;
		}
		
		let json = JSON.stringify(data, null, "\t");
		fs.writeFileSync("data.json", json);

		sendMsg(chan, "La combinaison **" + args[0] + "** - **" + args[1] + "** a été enlevée");
	}
}

function sendMsg(chan, msg) {
	const Discord = require("discord.js");
	let embed = new Discord.MessageEmbed()
		.setColor("#AC8A4D")
		.setDescription(msg);
	chan.send(embed);
}