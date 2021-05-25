module.exports = {
    name: "info",
    title: "Informations",
    arguments: [""],
    description: "Affiche les informations générales relatives au bot.",
    async execute(chan, guild, args) {
        const Discord = require("discord.js");
        const config = require("../config");
        const client = new Discord.Client();
        client.login(config.BOT_TOKEN);
        var embed = new Discord.MessageEmbed()
            .setColor("#AC8A4D")
            .setTitle("Informations générales")
            .setThumbnail((await client.users.fetch("725370669289963521")).displayAvatarURL())
            .setDescription("Un bot simple qui répond à vos messages pour vous embêter.")
            .addField("Page de présentation du bot :", "https://top.gg/bot/725370669289963521")
            .addField("Rejoindre le serveur Discord officiel :", "https://discord.gg/8erdnb5QCS")
            .setFooter("Version 1.0");
        chan.send(embed);
    }
}
