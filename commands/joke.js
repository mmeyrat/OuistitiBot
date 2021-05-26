module.exports = {
    name: "blague",
    title: "Blague",   
    arguments: ["type"],
    description: "Envoie une blague du type précisé, parmi les types suivants `global`, `dev`, `dark`, `limit`, `beauf`, `blondes`. Si aucun type n'est précisé, une blague aléatoire est envoyée.",
    async execute(chan, guild, args) {
        const config = require("../config");
        const Discord = require("discord.js");
        const fetch = require("node-fetch");

        var url = "random";
        var types = ["global", "dev", "dark", "limit", "beauf", "blondes"];

        if (args[0] != null && !types.includes(args[0])) {
            var embed = new Discord.MessageEmbed()
                .setColor("#AC8A4D")
                .setDescription("Veuillez utiliser un type de blague existant (voir `o!aide`)")
            chan.send(embed);
            return;
        } else if (types.includes(args[0])) {
            url = "type/" + args[0] + "/random";
        }

        var json = await fetch("https://www.blagues-api.fr/api/" + url, {
            headers: {
                "Authorization": "Bearer " + config.API_TOKEN,
            }
        }).then(response => response.json());

        var embed = new Discord.MessageEmbed()
            .setColor("#AC8A4D")
            .setDescription(json.joke + "\n*→ " + json.answer.trim() + "*")
            .setFooter(json.type);
        chan.send(embed);
    }
}
