module.exports = {
    name: "blague",
    description: "Envoie une blague aléatoire",
    async execute(chan, guild, args) {
        const Discord = require("discord.js");
        const fetch = require("node-fetch");

        var url = "https://www.blagues-api.fr/api/random";
        var types = ["global", "dev", "dark", "limit", "beauf", "blondes"];

        if (args[0] != null && !types.includes(args[0])) {
            return;
        } else if (types.includes(args[0])) {
            url = "https://www.blagues-api.fr/api/type/" + args[0] + "/random";
        }

        var json = await fetch(url, {
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMjY2NzA3NjQ1ODAzNjU5Mjc0IiwibGltaXQiOjEwMCwia2V5IjoibE1ad2JXVmxjREk1OExkbVp4UWlZQmVSWXA4NkVEWGNyYmgzdFlobm9vMTk0bFJEcnQiLCJjcmVhdGVkX2F0IjoiMjAyMC0xMS0yNVQyMjoxNDo0NyswMTowMCIsImlhdCI6MTYwNjMzODg4N30.WwGWyO97ZrToTk9xTPVOJQPhE6cqo46PK7zwDXaFwv0"
            }
        }).then(response => response.json());

        var embed = new Discord.MessageEmbed()
            .setColor("#AC8A4D")
            .setDescription(json.joke + "\n*→ " + json.answer + "*")
            .setFooter(json.type);
        chan.send(embed);
    }
}
