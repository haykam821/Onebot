

function CommandController(doc){
    this.prefix=doc.prefix||'!'
    this.commands={}
    this.numberOfCmds=0;
}

CommandController.prototype.add=function(name,func,helptext){
    console.log('added: '+name)
    this.commands[name]={name:name,func:func,help:typeof helptext!=='undefined'?helptext:''}
    this.numberOfCmds++;
}

CommandController.prototype.handle=function(context){
    var msg=context.message.split(" ")

    if (msg[0]&&this.commands[msg[0]]){
        this.commands[msg[0]].func(context,context.message.substring(msg[0].length).trim())
    }
}

CommandController.prototype.constructHelpMsg=function(){
    this.add('help',function(context){
        var controller=context.controller
        var stringify="```Help\n"
        Object.keys(controller.commands).forEach(function(key) {
            var val = controller.commands[key];
            stringify+=val.name+": "+val.help+"\n"
        });
        stringify+="```"
        context.bot.sendMsgLog({
            context:context,
            to: context.channelID,
            message: stringify
        });

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