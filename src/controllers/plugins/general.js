exports.controlladder = (function adder(controller) {
    controller.add('channel', function (context) {
        context.bot.sendMsgLog({
            context: context,
            to: context.channelID,
            message: context.channelID
        });
    }, 'This function prints the current channel')
    controller.add('repeat', function (context, repeat) {
        context.bot.sendMsgLog({
            context: context,
            to: context.channelID,
            message: repeat
        });
    }, 'This function repeats the message')
    controller.add('repeatspeech', function (context, repeat) {
        context.bot.sendMsgLog({
            context: context,
            tts: true,
            to: context.channelID,
            message: repeat
        });
    }, "This function repeats the message with speech")
    controller.add('repeatto', function (context, repeatto, repeat) {
        context.bot.sendMsgLog({
            context: context,
            to: repeatto,
            message: repeat
        });
    }, "This function repeats the message")

})

