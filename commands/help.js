module.exports = {
    name: "aide",
    description: "Affiche l'aide",
    execute(chan, guild, args) {
        const Discord = require("discord.js");
        var embed = new Discord.MessageEmbed()
            .setColor("#AC8A4D")
            .setTitle("Aide")
            .addField("Commandes", 
            "`o!aide`\n" + 
            "`o!delai <nombre>`\n" +
            "`o!mots`"
            , true)
            .addField("Descriptions", 
            "Affiche l'aide\n" +
            "Définit le délai en minutes entre chaque message\n" +
            "Affiche la liste des mots pris en compte, ansi que leurs suffixes\n"                     
            , true)
        chan.send(embed);
    }
}
