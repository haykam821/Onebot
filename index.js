#!/usr/bin/env node

var fs = require('fs');
var dio = require('discord.io');
var program = require('yargs');
var plugins = require('./plugins.json');

program
	.command(['run', '*'], 'Runs Onebot.', function(run) {
		run
			.option('token')
			.describe('token', 'Specifies the token to use to authenticate with Discord.')
			.string('token')
			.require('token')
			.alias('token', 't')

			.option('safe')
			.describe('safe', 'If enabled, ignores the list of active plugins and only runs the main Onebot process.')
			.boolean('safe')
			.default(false)
			.alias('safe', 's');
	}, run)

	.command('enable <names...>', 'Enables the use of a module as a Onebot plugin.', {}, addPlugin)

	.command('disable <names...>', 'Disables the use of a module as a Onebot plugin.', {}, removePlugin)

	.command('disable-all', 'Disables all Onebot plugins.', {}, removeAll)

	.command('list', 'Lists the Onebot plugins that are currently enabled.', function(list) {
		list
			.option('flatten')
			.describe('flatten', 'If enabled, outputs the enabled plugins as a simple comma-separated list.')
			.boolean('flatten')
			.default(false)
			.alias('flatten', 'f');
	}, stdoutPlugins)

	.help()
	.version('4.0.0')
	.parse();

Array.prototype.remove = function() { // from https://stackoverflow.com/a/3955096/5513988
	var what, a = arguments,
		L = a.length,
		ax;
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

	bot.on('message', function() {
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

function removeAll() {
	plugins.length = 0;

	savePlugins();
}

function stdoutPlugins() {
	if (plugins.length > 0) {
		var split = plugins.join('\n├ ').split('');
		split[split.lastIndexOf('├')] = '└';

		console.log(`Onebot v${require('./package.json').version}\n├ ${split.join('')}`);
	} else {
		console.log(`Onebot v${require('./package.json').version}`);
	}
}

function savePlugins() {
	fs.writeFile('./plugins.json', JSON.stringify(plugins, null, 2), function(err) {
		if (err) return console.log(err);
	});
}
