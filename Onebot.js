yaml = require('js-yaml');
fs = require('fs');
var doc = yaml.safeLoad(fs.readFileSync('config.yaml', 'utf8'));

var Discord = require('discord.io');
var bot = new Discord.Client({
    autorun: true,
    token: doc.token
});
var randmsgs = ["This is an example random message.", "Randomizations!", "Random, I say!", "Random, I say.", "Look, it’s a new randomized message!", "r"];
var version = "1.5.1"
var sender = "";

function applyVar(thing) {
    test = eval('thing')
    test = test.replace(doc.sendervar, sender);
    test = test.replace(doc.versionvar, version);
    return test
}

if (doc.startupconsole === "") {
    console.log("Started up config successfully!");
} else {
    console.log(doc.startupconsole);
};

bot.on('ready', function(event) {
    if (doc.startupevent === "") {
        bot.sendMessage({
            to: "222393788755083264",
            message: "Logged in as " + bot.username + " (who has ID " + bot.id + ")"
        });
    } else {
        bot.sendMessage({
            to: "222393788755083264",
            message: doc.startupconsole
        });
    }
});

var path = require('path');
var includeAll = require('include-all');
 
var controllers = require('include-all')({
  dirname     :  path.join(__dirname, 'plugins'),
  filter      :  /(.+)\.obp$/,
});