module.exports = {
    name: "delai",
    description: "Définit le délai en minutes entre chaque message",
    execute(chan, guild, args) {
        const Discord = require("discord.js");
        const fs = require("fs");

        if (args[0] == null || isNaN(args[0])) {
            var embed = new Discord.MessageEmbed()
                .setColor("#AC8A4D")
                .setDescription("Veuillez préciser le délai en minutes")
            chan.send(embed);
            return;
        }

        var delays = JSON.parse(fs.readFileSync("delays.json", 'utf8'));

        if (delays.serveurs[guild] == null) {
            delays.serveurs[guild] = [];
        }

        delays.serveurs[guild][0] = Number(args[0]);
        var json = JSON.stringify(delays);
        fs.writeFileSync("delays.json", json);

        var embed = new Discord.MessageEmbed()
            .setColor("#AC8A4D")
            .setDescription("Il y a maintenant **" + args[0] + "** minutes d'attente entre chaque message")
        chan.send(embed);
    }
}
