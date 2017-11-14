#!/usr/bin/env node

var fs = require('fs');
var dio = require('discord.io');
var program = require('yargs');
var plugins = require('./plugins.json');

program
  // onebot run
  .command('run', 'Runs Onebot.', function (run) {
    run
      .option('token')
      .describe('token', 'Specifies the token to use to authenticate with Discord.')
      .string('safe')
      .require('token')
      .alias('token', 't')

      .option('safe')
      .describe('safe', 'If enabled, ignores the list of active plugins and only runs the main Onebot process.')
      .boolean('safe')
      .alias('safe', 's');
  }, run)

  // onebot add-plugin
  .command('add-plugin <names...>', 'Enables the use of a module as a Onebot plugin.', {}, addPlugin)

  // onebot remove-plugin
  .command('remove-plugin <names...>', 'Disables the use of a module as a Onebot plugin.')

  .help()
  .version('4.0.0')
  .parse();

Array.prototype.remove = function() { // from https://stackoverflow.com/a/3955096/5513988
  var what, a = arguments, L = a.length, ax;
  while (L && this.length) {
      what = a[--L];
      while ((ax = this.indexOf(what)) !== -1) {
          this.splice(ax, 1);
      }
  }
  return this;
};

function run(program) {
  var bot = new dio.Client({
    autorun: true,
    token: program.token
  });

  console.log(plugins);

  bot.on('message',function() {
    console.log('hi');
  });
}

function addPlugin(program) {
  for (var i in program.names) {
    if (plugins.includes(program.names[i])) return;

    plugins.push(program.names[i]);
  }

  savePlugins();
}

function removePlugin(program) {
  for (var i in program.names) {
    if (!plugins.includes(program.names[i])) return;

    plugins = plugins.remove(program.names[i]);
  }

  savePlugins();
}

function savePlugins() {
  fs.writeFile('./plugins.json', JSON.stringify(plugins, null, 2), function (err) {
    if (err) return console.log(err);
  });
}
