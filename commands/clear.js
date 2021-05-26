module.exports = {
    name: "effacer",
    title: "Effacer les données",
    arguments: [""],
    description: "Supprime toutes les données sauvegardées par le bot de ce serveur.",
    execute(chan, guild, args) {
        const Discord = require("discord.js");
        const fs = require("fs");

        var delays = JSON.parse(fs.readFileSync("delays.json", 'utf8'));

        if (delays.serveurs[guild] == null) {
            var embed = new Discord.MessageEmbed()
                .setColor("#AC8A4D")
                .setDescription("Aucune donnée à supprimer")
            chan.send(embed);
            return;
        }

        delete delays.serveurs[guild];
        var json = JSON.stringify(delays);
        fs.writeFileSync("delays.json", json);

        var embed = new Discord.MessageEmbed()
            .setColor("#AC8A4D")
            .setDescription("Toutes les données ont été supprimées avec succès")
        chan.send(embed);
    }
}
