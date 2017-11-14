#!/usr/bin/env node

var dio = require('discord.io');
var program = require('yargs');

program
  .command('run', 'Runs Onebot.', {}, run)

  .option('token')
  .describe('token', 'Specifies the token to use to authenticate with Discord.')
  .string('safe')
  .require('token')
  .alias('token', 't')

  .option('safe')
  .describe('safe', 'If enabled, ignores the list of active plugins and only runs the main Onebot process.')
  .boolean('safe')
  .alias('safe', 's')

  .command('add-plugin <name>', 'Enables the use of a module as a Onebot plugin.')
  .command('remove-plugin <name>', 'Disables the use of a module as a Onebot plugin.')

  .help()
  .version('4.0.0')
  .argv;

function run(program) {
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
