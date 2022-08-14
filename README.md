# OuistitiBot

OuistitiBot est une application Discord ayant pour vocation d'envoyer des messages en réponse aux votres. Si vous aimez les blagues du type "quoi ? - feur" ce bot est fait pour vous.  
  
Lorsque la fin d'un de vos messages envoyé dans un salon est reconnue par le bot, il vous répondra de manière appropriée. Par défaut, le bot incorpore 10 mots, mais il est possible de rajouter jusqu'à 30 mots personnalisés par serveur. Également, d'autres commandes permettent de gérer ce trublion et personnifier cotre expérience.  
  
[Inviter le bot à votre serveur](https://discord.com/api/oauth2/authorize?client_id=1007028483505012807&permissions=534723951680&scope=bot)
  

## Commandes

- `o!aide` pour avoir des détails sur l'utilisation des commandes.

- `o!ajouter`, `o!enlever` et `o!modifier` pour ajouter vos propres mots à la liste du bot.

- `o!delai` permet de mettre un délai entre les messages envoyés par le bot pour l'empêcher d'inonder vos conversations.

- `o!nombre` pour que le bot réponde à des nombres. 

- `o!blague` envoie une blague aléatoire parmi plusieurs types disponibles comme `global`, `dark`, `blondes`... 

- et bien d'autres à découvrir !


## Guide d'installation

Ce bot est actuellement en ligne, mais il est possible de l'installer localement avec le guide suivant.  


### Pré-requis

Pour le bon fonctionnement de ce projet, il est indispensable d'avoir réalisé les étapes suivantes :

1. Installer Node.js v18.7.0.
2. Créer une application sur le [portail développeur Discord](https://discord.com/developers/).
3. Récupérer un jeton [Blagues API](https://www.blagues-api.fr/) (facultatif).
4. Ajouter l'application sur [Top.gg](https://top.gg/) (facultatif).
5. Ajouter un fichier `config.js` à la racine du projet. Celui-ci doit contenir le jeton de l'application Discord, un jeton Blagues API et le jeton Top.gg relié à l'application Discord.  
  
Corps du fichier `config.js` :
```js
exports.BOT_TOKEN = "...";
exports.JOKE_TOKEN = "...";
exports.TOPGG_TOKEN = "...";
```

### Installation

Après avoir mis en place les pré-requis, il est nécessaire de suivre chacune de ces étapes :

1. Cloner le projet,  
```git clone https://github.com/mmeyrat/OuistitiBot.git```
2. Ajouter le fichier `config.js` à la racine du projet.
3. Installer les dépendances,  
```npm install```
4. Éxecuter le projet,  
```npm run start```


## Liens utiles

[Rejoindre le serveur Discord OuistitiBot](https://discord.gg/3DbtncXpjC)

[Page Top.gg](https://top.gg/bot/725370669289963521)

----

Maxime Meyrat