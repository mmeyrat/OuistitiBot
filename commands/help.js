module.exports = {
    name: "aide",
    title: "Aide",
    arguments: [""],
    description: "Affiche l'aide.",
    example: "",
    async execute(chan, guild, args) {
        const Discord = require("discord.js");
        const fs = require('fs');

        var embed = new Discord.MessageEmbed()
            .setColor("#AC8A4D")
            .setTitle("Liste des commandes");

        fs.readdirSync("./commands").forEach(file => {
            var command = require("./" + file);
            var nameAndArgs = `\`o!${command.name}`;
            for (var i = 0; i < command.arguments.length; i++) {
                if (command.arguments[i] != "") {
                    nameAndArgs += ` <${command.arguments[i]}>`;
                }
            }
            embed.addField(command.title, `${nameAndArgs}\` : ${command.description}\n(Exemple : \`o!${command.name}${command.example}\`)`);
        });

        chan.send(embed);
    }
}
