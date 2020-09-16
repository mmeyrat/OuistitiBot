module.exports = {
    name: "aide",
    description: "Affiche l'aide'",
    execute(chan, args) {
        test = 3;
        const Discord = require("discord.js");
        var embed = new Discord.MessageEmbed()
            .setColor("#AC8A4D")
            .setTitle("Aide")
            .addField("Commandes", 
            "$aide\n" + 
            "$delais\n" +
            "$mots"
            , true)
            .addField("Descriptions", 
            "Affiche l'aide\n" +
            "Définit le délais entre chaques messages\n" +
            "Affiche la liste des mots pris en compte, ansi que leurs suffixes\n"                     
            , true)
        chan.send(embed);
    }
}
