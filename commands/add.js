module.exports = {
    name: "ajouter",
    title: "Ajouter un mot/suffixe",
    arguments: ["mot", "suffixe"],
    description: "",
    execute(chan, guild, args) {
        const Discord = require("discord.js");
        const fs = require("fs");

        if (args[0] == null || args[1] == null 
            || args[0].length > 20 || args[1].length > 20 
            || args[0].length == 0 || args[1].length == 0) {
            var embed = new Discord.MessageEmbed()
                .setColor("#AC8A4D")
                .setDescription("Paramètres incorrectes (voir `o!aide`)")
            chan.send(embed);
            return;
        }

        var data = JSON.parse(fs.readFileSync("data.json", 'utf8'));

        if (data.servers[guild] == null) {
            data.servers[guild] = {};
        }

        if (data.servers[guild].words == null) {
            data.servers[guild].words = {};
            data.servers[guild].wordCount = 0;
        }

        if (data.servers[guild].words[args[0]] == null) {
            data.servers[guild].words[args[0]] = []
        }

        data.servers[guild].words[args[0]].push(args[1]);
        data.servers[guild].wordCount++;
        var json = JSON.stringify(data, null, "\t");
        fs.writeFileSync("data.json", json);

        var embed = new Discord.MessageEmbed()
            .setColor("#AC8A4D")
            .setDescription("**" + args[0] + " - " + args[1] + "** a été ajouté")
        chan.send(embed);
    }
}
