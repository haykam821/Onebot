var start = new Date();

var yaml = require('js-yaml');
var fs = require('fs');
var doc = yaml.safeLoad(fs.readFileSync('config.yaml', 'utf8'));
var path = require('path');
var includeAll = require('include-all');
var jsdom = require("jsdom");

var dir = './plugins';

if (!fs.existsSync(dir)){
    console.log("Plugins folder don't exist. Creating.");
    fs.mkdirSync(dir);
}

var controllers = includeAll({
  dirname     :  path.join(__dirname, 'plugins'),
  filter      :  /(.+)\.obp$/,
  flatten     : true,
  keepDirectoryPath : true
});

var $, functions;

jsdom.env({
  html: "",
  scripts: ["http://code.jquery.com/jquery.js"],
  done: function (err, window) {
    $ = window.$;
    functions = $.map(controllers, function(el) { return el; });
  }
});

var Discord = require('discord.io');
var bot = new Discord.Client({
    autorun: true,
    token: doc.token
});

var randmsgs = ["This is an example random message.", "Randomizations!", "Random, I say!", "Random, I say.", "Look, it’s a new randomized message!", "r"];
var version = doc.internalversion;
var sender = "";

function applyVar(thing) {
    test = eval('thing');
    test = test.replace(doc.sendervar, sender);
    test = test.replace(doc.versionvar, version);
    return test;
}

if (doc.startupconsole === "") {
    console.log("Started up config successfully!");
} else {
    console.log(doc.startupconsole);
};

bot.on('ready', function(event) {
    if (doc.startupevent === "") {
        bot.sendMessage({
            to: doc.logchannel,
            message: "Logged in as " + bot.username + " (who has ID " + bot.id + ")"
        });
    } else {
        bot.sendMessage({
            to: doc.logchannel,
            message: doc.startupconsole
        });
    }
});

bot.on('message', function(user, userID, channelID, message, event) {
  try{
    for(var i = 0; i < functions.length; i++){
      functions[i].onMessageReceived(bot, doc, user, userID, channelID, message, event);
    }
  } catch (error){
    console.log(error);
  }
});
