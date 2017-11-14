#!/usr/bin/env node

var dio = require('discord.io');
var program = require('commander');

program.version('4.0.0');

program.command('run')
  .description('Runs Onebot.')
  .option('-t, --token', 'Specifies the token to use to authenticate with Discord.')
  .action(function(){require('./run.js').run(program)});

program.command('add-plugin <name>', 'Enables the use of a module as a Onebot plugin.');
program.command('remove-plugin <name>', 'Disables the use of a module as a Onebot plugin.');

program.parse(process.argv);

var run = function(program) {
  var bot = new dio.Client({
    autorun: true,
    token: program.token
  });

    console.log(program);
    //setTimeout(function(){console.log('hi')},2000);
  bot.on('message',function() {
    console.log('hi');
  });
};
