const Discord = require("discord.js");
const client = new Discord.Client();

var hein = ["bécile", "deux", "dien"];
var non = ["ante", "bril", "chalant", "obstant", "uplet"];
var si = ["fflet", "lence", "prine", "rano", "tron"];
var qui = ["gnon", "quette"];

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`)
});

client.user.setActivity(`this won't appear in the bot's custom status!`, {type: 4})

client.on("message", msg => {
  var chan = client.channels.cache.get(msg.channel.id);
  var submsg = msg.toString().split(" ");
  var msgUpper = submsg[submsg.length - 1].normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();

  switch (msgUpper) {
    case "AH":
      chan.send("B");
      break;
    case "ATTENDS":
      chan.send("tion");
      break;
    case "CA":
      chan.send("lad");
      break;
    case "COMMENT":
      chan.send("tateur");
      break;
    case "DIT":
      chan.send("ctionnaire");
      break;
    case "HEIN":
      chan.send(hein[Math.floor(Math.random() * hein.length)]);
      break;
    case "NAN":
      chan.send("cy");
      break;
    case "NON":
      chan.send(non[Math.floor(Math.random() * non.length)]);
      break;
    case "OUI":
      chan.send("stiti");
      break;
    case "OUAIS":
      chan.send("stern");
      break;
    case "QUI":
      chan.send(qui[Math.floor(Math.random() * qui.length)]);
      break;
    case "QUOI":
      chan.send("feur");
      break;
    case "SI":
      chan.send(si[Math.floor(Math.random() * si.length)]);
      break;
    case "VOILA":
      chan.send("ctée");
      break;
    case "YES":
      chan.send("terday");
      break;
  }
});

client.login("NzI1MzcwNjY5Mjg5OTYzNTIx.XvN7dg.bGFMMhNmMXAiJ0FqZuZMPgUejyE");
