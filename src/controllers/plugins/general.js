exports.controlladder = (function adder(controller) {
    controller.add('channel', function (context) {
        context.bot.sendMsgLog({
            context: context,
            to: context.channelID,
            message: context.channelID
        });
    }, 'This function prints the current channel')
    controller.add('repeat', function (context, torepeat) {
        context.bot.sendMsgLog({
            context: context,
            to: context.channelID,
            message: torepeat
        });
    }, 'This function repeats the message')
})

