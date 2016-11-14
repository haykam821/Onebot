

function CommandController(doc){
    this.prefix=doc.prefix||'!'
    this.commands={}
    this.numberOfCmds=0;
}

CommandController.prototype.add=function(name,func,helptext){
    var nrparams=this.getArgs(func).length

    if (nrparams>=0) {
        this.commands[name] = {
            name: name,
            func: func,
            help: typeof helptext !== 'undefined' ? helptext : '',
            nrparams: nrparams
        }
        this.numberOfCmds++;
        console.log('added: '+name)

    }
    else
        console.log("didn't add because of missing context parameter:"+ name)
}

CommandController.prototype.handle=function(context){
    var msg=context.message.split(" ")

    var cmd=this.commands[msg[0]]

    if (msg[0]&&cmd){


        var split=context.message.substring(msg[0].length).trim().split(" ")


        if (cmd.nrparams<split.length) {
            var subarray = split.slice(cmd.nrparams-1).join(" ")
            split[cmd.nrparams-1]=subarray
        }
        arr=[context].concat(split)


            cmd.func.apply(this,arr)
    }
}


CommandController.prototype.getArgs=function(func) {
    // First match everything inside the function argument parens.
    var args = func.toString().match(/function\s.*?\(([^)]*)\)/)[1];


    var contextstr='context'
    if (args.startsWith(contextstr))
        args=args.substring(contextstr.length)

    // Split the arguments string into an array comma delimited.
    return args.split(', ').map(function(arg) {
        // Ensure no inline comments are parsed and trim the whitespace.
        return arg.replace(/\/\*.*\*\//, '').trim();
    }).filter(function(arg) {
        // Ensure no undefined values are added.
        return arg;
    });
}

CommandController.prototype.constructHelpMsg=function(){



    this.add('help',function(context,cmd){

        var controller=context.controller
        if (cmd!=''&&cmd!='help'){
            if (controller.commands[cmd]){
                context.bot.sendMsgLog({
                    context: context,
                    to: context.channelID,
                    message: "```"+context.doc.prefix+cmd+" "+this.getArgs(controller.commands[cmd].func).join(" ")+"\n"+controller.commands[cmd].help+"```"
                });
            }
            else{
                context.bot.sendMsgLog({
                    context: context,
                    to: context.channelID,
                    message: "Command not found"
                });
            }
        }else {
            var stringify="```Help\n"
            Object.keys(controller.commands).forEach(function (key) {
                var val = controller.commands[key];
                stringify += val.name + ": " + val.help + "\n"
            });
            stringify += "\nType "+context.doc.prefix+"help command for more info on a command.```"
            context.bot.sendMsgLog({
                context: context,
                to: context.channelID,
                message: stringify
            });
        }
    },'prints this help message')
}



CommandController.prototype.setup=function() {
    var includeAll = require('include-all');
    var path = require('path');
    var fs = require('fs');
    var jsdom = require("jsdom");
    var $, functions;
    var plugins = includeAll({
        dirname: path.join(__dirname, './plugins'),
        filter: /(.+)\.js/,
        flatten: true,
        keepDirectoryPath: true
    });
    var controller=this

    function worker(){
        for (var i=0,len=functions.length;i<len;i++)
            functions[i].controlladder(controller);
        controller.constructHelpMsg()

    }

    jsdom.env({
        html: "",
        scripts: ["http://code.jquery.com/jquery.js"],
        done: function (err, window) {
            $ = window.$;
            functions = $.map(plugins, function(el) { return el; });
            worker()
        }
    });


}

module.exports=CommandController