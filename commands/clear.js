module.exports = {
    name: "effacer",
    title: "Effacer les données",
    arguments: [""],
    description: "Supprime toutes les données sauvegardées par le bot de ce serveur.",
    execute(chan, guild, args) {
        const Discord = require("discord.js");
        const fs = require("fs");

        var data = JSON.parse(fs.readFileSync("data.json", 'utf8'));

        if (data.servers[guild] == null) {
            var embed = new Discord.MessageEmbed()
                .setColor("#AC8A4D")
                .setDescription("Aucune donnée à supprimer")
            chan.send(embed);
            return;
        }

        delete data.servers[guild];
        var json = JSON.stringify(data, null, "\t");
        fs.writeFileSync("data.json", json);

        var embed = new Discord.MessageEmbed()
            .setColor("#AC8A4D")
            .setDescription("Toutes les données ont été supprimées avec succès")
        chan.send(embed);
    }
}
