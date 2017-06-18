var start = new Date();
var yaml = require('js-yaml');
var fs = require('fs');
var doc = yaml.safeLoad(fs.readFileSync('config.yaml', 'utf8'));
var points = yaml.safeLoad(fs.readFileSync('points.yaml', 'utf8'));
var path = require('path');
var jsdom = require("jsdom");
exports.syntaxes = [""];
exports.descriptions = [""];

var plugins = [];

var dir = './plugins';

if (!fs.existsSync(dir)){
    console.log("Plugins folder don't exist. Creating.");
    fs.mkdirSync(dir);
}

var includeAll = require('include-all');
var controllers = includeAll({
  dirname           :  path.join(__dirname, 'plugins'),
  filter            :  /(.+)\.obp$/,
  flatten           : true,
  force             : true,
  keepDirectoryPath : true
});

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

exports.randmsgs = ["This is an example random message.", "Randomizations!", "Random, I say!", "Random, I say.", "Look, it’s a new randomized message!", "r"];
exports.version = doc.internalversion;

exports.registerCmd = function(syntax, desc) {
  // Please update to fit this! syntax will be [[command1, command2], opts] but desc stays the same
  // Will remove previous code in a later update, so update quickly.
  var descgud = desc === undefined ? "No description provided." : desc;
  var command = typeof syntax === "object" ? doc.prefix + syntax[0].join("|" + doc.prefix) : syntax.toString().split(" ")[0];
  var opts = typeof syntax === "object" ? syntax[1] : syntax.split(" ").slice(1).join(" ");
  var syntaxopts = syntax[1] === undefined ? "" : syntax[1];
  var syntaxgud = "<" + command + "> " + opts;
  console.log(syntaxgud)
  if (exports.syntaxes.indexOf(syntaxgud) == -1 && exports.descriptions.indexOf(descgud) == -1) {
     exports.syntaxes.push(syntaxgud);
     exports.descriptions.push(descgud);
  }
}

exports.makeCommand = function(code, syntax, desc) {
var onebotdesc = desc === undefined ? "No description provided." : desc
if (exports.syntaxes.indexOf(syntax) == -1 && exports.descriptions.indexOf(desc) == -1) {
   exports.syntaxes.push(syntax);
    exports.descriptions.push(onebotdesc);
}
}

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

var isBot = (doc.usertype == 'auto' && bot.bot) || doc.usertype == 'bot';

var texts = yaml.safeLoad(fs.readFileSync('texts.yaml', 'utf8'));

bot.on('message', function(user, userID, channelID, message, event, messageID) {
  try{
    for(var i = 0; i < functions.length; i++){
      functions[i].onMessageReceived(bot, doc, user, userID, channelID, message, event, messageID);
    }
  } catch (error){
    console.log(error);
  }
});

var index = 5;
texts = yaml.safeLoad(fs.readFileSync('texts.yaml', 'utf8'));

if (doc.reloadconfig !== -1) {
setInterval(function() {
doc = yaml.safeLoad(fs.readFileSync('config.yaml', 'utf8'));
points = yaml.safeLoad(fs.readFileSync('points.yaml', 'utf8'));
}, doc.reloadconfig * 1000);
};

function randInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
