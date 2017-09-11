var start = new Date();
var yaml = require('js-yaml');
var fs = require('fs');
var doc = yaml.safeLoad(fs.readFileSync('config.yaml', 'utf8'));
var path = require('path');
var jsdom = require("jsdom/lib/old-api");
var portableOptions = require("minimist")(process.argv.slice(2));

var plugins = [];

var dir = './plugins';

if (!fs.existsSync(dir)) {
  console.log("Plugins folder don't exist. Creating.");
  fs.mkdirSync(dir);
}

var includeAll = require('include-all');
var controllers = includeAll({
  dirname: path.join(__dirname, 'plugins'),
  filter: /(.+)\.obp\.js$/,
  flatten: true,
  force: true,
  keepDirectoryPath: true
});

jsdom.env({
  html: "",
  scripts: ["http://code.jquery.com/jquery.js"],
  done: function(err, window) {
    $ = window.$;
    functions = $.map(controllers, function(el) {
      return el;
    });
  }
});

var Discord = require('discord.io');
var bot = new Discord.Client({
  autorun: true,
  token: portableOptions.token ? portableOptions.token : doc.token
});

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

/*bot.on('disconnect', function(event) {
  bot.disconnect();
  console.log("Tried to reconnect.")
  bot.connect();
});*/

bot.on('ready', function(event) {
  if (doc.startupevent === "") {
    bot.sendMessage({
      to: doc.logchannel,
      message: "Logged in as <@" + bot.id + ">."
    });
  } else {
    bot.sendMessage({
      to: doc.logchannel,
      message: doc.startupconsole
    });
  }
});

if (portableOptions.prefix) {
  doc.prefix = portableOptions.prefix;
}

var isBot = (doc.usertype == 'auto' && bot.bot) || doc.usertype == 'bot';

//var texts = yaml.safeLoad(fs.readFileSync('texts.yaml', 'utf8'));

bot.on('message', function(user, userID, channelID, message, event, messageID) {
  if (!isBot && userID !== bot.id) return;

  try {
    for (var i = 0; i < functions.length; i++) {
      functions[i].onMessageReceived(bot, doc, user, userID, channelID, message, event, messageID);
    }
  } catch (error) {
    console.log(error);
  }
});

var index = 5;
//texts = yaml.safeLoad(fs.readFileSync('texts.yaml', 'utf8'));

if (doc.reloadconfig !== -1) {
  setInterval(function() {
    doc = yaml.safeLoad(fs.readFileSync('config.yaml', 'utf8'));
    //points = yaml.safeLoad(fs.readFileSync('points.yaml', 'utf8'));
  }, doc.reloadconfig * 1000);
};

function randInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
