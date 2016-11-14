var start = new Date();

var yaml = require('js-yaml');
var fs = require('fs');
var cmdcontroller = require("./controllers/commandcontroller")
// Get document, or throw exception on error
var doc;
try {
    doc = yaml.safeLoad(fs.readFileSync('../config.yaml', 'utf8'));
    console.log(doc);
} catch (e) {
    console.log(e);
}
var path = require('path');
var Discord = require('discord.io');

Discord.Client.prototype.sendMsgLog=function(stuff){
    this.sendMessage(stuff)
    this.sendMessage({
        to: doc.logchannel,
        message: stuff.context.user+": "+stuff.message
    });
}

var bot = new Discord.Client({
    autorun: true,
    token: doc.token
});


var version = doc.internalversion;
var sender = "";


cmdcontroller = new cmdcontroller(doc)
cmdcontroller.setup()


if (doc.startupconsole === "") {
    console.log("Started up config successfully!");
} else {
    console.log(doc.startupconsole);
}
;

bot.on('ready', function (event) {
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

bot.on('message', function (user, userID, channelID, message, event) {
    try {
        if (message.startsWith(doc.prefix)&&userID!=bot.id)
            cmdcontroller.handle({
                controller:cmdcontroller,
                bot: bot,
                doc: doc,
                user: user,
                userID: userID,
                channelID: channelID,
                message: message.substring(1),
                event: event
            })
    } catch (error) {
        console.log(error);
    }
});
