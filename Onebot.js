var Discord = require('discord.io');
var bot = new Discord.Client({
    autorun: true,
    token: "ADD-YOUR-TOKEN-HERE"
});
var randmsgs = ["This is an example random message.", "Randomizations!", "Random, I say!", "Random, I say.", "Look, it’s a new randomized message!"];
var version = "1.1"

bot.on('ready', function(event) {
    bot.sendMessage({
        to: "222393788755083264",
        message: "Logged in as " + bot.username + " (who has ID " + bot.id + ")"
    });
});

bot.on('message', function(user, userID, channelID, message, event) {
    if (message === "*ping") {
        bot.sendMessage({
            to: "222393788755083264",
            message: user + " sent ping command."
        });
        bot.sendMessage({
            to: channelID,
            message: "Pong!"
        });
    }
    if (message === "*pong") {
        bot.sendMessage({
            to: "222393788755083264",
            message: user + " sent pong command."
        });
        bot.sendMessage({
            to: channelID,
            message: "Ping!"
        });
    }
    if (message === "*ver" || message === "*version") {
        bot.sendMessage({
            to: "222393788755083264",
            message: user + " asked for the version number."
        });
        bot.sendMessage({
            to: channelID,
            message: "The version I’m running is v" + version + "!"
        });
    }
    if (message.startsWith("*repeat ")) {
        bot.sendMessage({
            to: "222393788755083264",
            message: user + " made bot repeat: '" + message.match(/^.{8}(.*)/)[1] + "'"
        });
        bot.sendMessage({
            to: channelID,
            message: message.match(/^.{8}(.*)/)[1]
        });
    }
    if (message.startsWith("*repeatspeech ")) {
        bot.sendMessage({
            to: "222393788755083264",
            message: user + " made bot repeat with TTS: '" + message.match(/^.{14}(.*)/)[1] + "'"
        });
        bot.sendMessage({
            to: channelID,
            tts: true,
            message: message.match(/^.{14}(.*)/)[1]
        });
    }
    if (message.startsWith("*log ")) {
        bot.sendMessage({
            to: "222393788755083264",
            message: user + " sent message to console: '" + message.match(/^.{5}(.*)/)[1] + "'"
        });
        bot.sendMessage({
            to: channelID,
            message: "I’ve logged that message to console!"
        });
    }
    if (message === "*multiline") {
        bot.sendMessage({
            to: "222393788755083264",
            message: user + " tested multiline support."
        });
        bot.sendMessage({
            to: channelID,
            message: "I can\nmultiline"
        });
    }
    if (message === "*invite") {
        bot.sendMessage({
            to: "222393788755083264",
            message: user + " asked for the invite URL."
        });
        bot.sendMessage({
            to: channelID,
            message: "Invite me to your channel by clicking this URL: http://bit.ly/2chWygB"
        });
    }
    if (message === "*language" || message === "*lang") {
        bot.sendMessage({
            to: "222393788755083264",
            message: user + " asked for the bot’s language."
        });
        bot.sendMessage({
            to: channelID,
            message: "I am coded using the discord.io library! Join the discussion about it at https://discord.gg/7S95Wtj."
        });
    }
    if (message === "*randmsg" || message === "*randommsg") {
        var randmsgr = randmsgs[Math.floor(Math.random() * randmsgs.length)];
        bot.sendMessage({
            to: "222393788755083264",
            message: user + " asked for a random message and got '" + randmsgr + "'."
        });
        bot.sendMessage({
            to: channelID,
            message: randmsgr
        });
    }
    if (message.startsWith("*rand ") || message.startsWith("*random ")) {
        var opt = message.split(" ");
        var min = parseInt(opt[1]);
        var max = parseInt(opt[2]);
        if (!isNaN(min) && !isNaN(max)) {
            var randr = Math.floor(Math.random() * (max - min + 1) + min);
        }
        if (min === "N" && max === "α") {
            bot.sendMessage({
                to: "222393788755083264",
                message: user + " asked for a random number (" + min + " through " + max + ") and got an Easter egg."
            });
            bot.sendMessage({
                to: channelID,
                message: "Nanα. He provided the latest version of the random number picker."
            });
        } else {
            bot.sendMessage({
                to: "222393788755083264",
                message: user + " asked for a random number (" + min + " through " + max + ") and got '" + randr + "'."
            });
            bot.sendMessage({
                to: channelID,
                message: randr
            });
        }
    }
    if (message.startsWith("*js ")) {
        var jstest = message.match(/^.{4}(.*)/)[1];
        try {
            eval(bot.sendMessage({
                to: channelID,
                message: eval(message.match(/^.{4}(.*)/)[1])
            }));
            eval(bot.sendMessage({
                to: 222393788755083264,
                message: eval(user + " ran JavaScript code (`" + jstest + "`) with output: `" + eval(message.match(/^.{4}(.*)/)[1]) + "`.")
            }));
        } catch (err) {
            bot.sendMessage({
                to: "222393788755083264",
                message: user + " ran JavaScript code (`" + jstest + "`) with errors: `" + err + "`."
            })
            bot.sendMessage({
                to: channelID,
                message: "You got errors: `" + err + "`!"
            });
        }
    }
});
