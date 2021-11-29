module.exports = {
	name: "ajouter",
	title: "Ajouter un mot/suffixe",
	arguments: ["mot", "suffixe"],
	description: "Ajoute un mot et un suffixe à la liste des mots personnalisés (30 caractères maximum pour chacun). Il est possible d'ajouter un maximum de 20 mots ou suffixes (un mot peut avoir plusieurs suffixes).",
	example: " voila ctee",
	execute(chan, guild, args) {
		const fs = require("fs");

		if (args[0] == null || args[1] == null || args[2] != null) {
			sendMsg(chan, "Nombre d'arguments incorrect (voir `o!aide`)");
			return;
		}

		let processedWord = args[0].normalize("NFD").replace(/[\u0300-\u036f]|[\.\?\!\)]+$/g, "").toLowerCase();

		if (processedWord == null || processedWord.length > 30 || args[1].length > 30 || processedWord.length == 0) {
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

		if (data.servers[guild].wordCount >= 20) {
			sendMsg(chan, "Nombre maximal de mots/suffixes atteint (maximum 20)");
			return;
		}

		if (data.servers[guild].words[processedWord] == null) {
			data.servers[guild].words[processedWord] = [];
		}

		if (processedWord in data.servers[guild].words && data.servers[guild].words[processedWord].includes(args[1])) {
			sendMsg(chan, "Cette combinaison a déjà été ajoutée");
			return;
		}

		data.servers[guild].words[processedWord].push(args[1]);
		data.servers[guild].wordCount++;
		let json = JSON.stringify(data, null, "\t");
		fs.writeFileSync("data.json", json);

		sendMsg(chan, `La combinaison **${processedWord}** - **${args[1]}** a été ajoutée`);
	}
}

function sendMsg(chan, msg) {
	const Discord = require("discord.js");
	let embed = new Discord.MessageEmbed()
		.setColor("#AC8A4D")
		.setDescription(msg);
	chan.send(embed);
}
