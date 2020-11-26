module.exports = {
    name: "mots",
    title: "Mots & suffixes",
    arguments: [""],
    description: "Affiche la liste des mots pris en compte, ansi que leurs suffixes.",
    execute(chan, guild, args) {
        const Discord = require("discord.js");
        const fs = require("fs");

        var json = JSON.parse(fs.readFileSync("words.json", 'utf8'));

        var wordField = [];
        var suffixField = [];
        var i = 0;

        for (var word in json.mots) {
            wordField[i] = word;
            suffixField[i] = json.mots[word];
            i++;
        }

        var embed = new Discord.MessageEmbed()
            .setColor("#AC8A4D")
            .setTitle("Liste de mots & suffixes")
            .addField("Mots", wordField.join('\n'), true)
            .addField("Suffixes", suffixField.join('\n'), true);
        chan.send(embed);
    }
}
