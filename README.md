**WARNING:** The developer of Onebot is not responsible for damage caused by plugins! Please use verified plugins only!

## Requirements

Onebot, without any plugins, requires these Node.js modules (and Node.js itself) to properly function without giving you errors:

* `js-yaml` for the configuration file
* `discord.io` for pretty much everything the bot does
* `fs` for managing the filesystem (config)
* `path` for the location of the plugins folder
* `include-all` for loading the plugins
* `jsdom` for loading jQuery
* `node-notifier` for cross platform notifications
* `esrever` for string reversal
* `replaceall` for replacement of all string instances without regular expressions

You can use this single NPM command to install every Node.js module in the above list.

    npm install js-yaml discord.io fs path include-all jsdom node-notifier esrever replaceall
    
^^^soon ^^^you ^^^will ^^^only ^^^need ^^^to ^^^download ^^^the ^^^repository!

Additional modules may be needed for nonbundled plugins; please consult the developer's GitHub repository for more information.

## Setup

After installing the required Node.js modules discussed in the last section, you should be ready to go. Open up `config.yaml` with your favorite YAML text editor and find the key named `token`. Please set its value to your bot's token and place quotes around it.

You are now able to run Onebot! Find your directory in a command prompt and `cd` to it. Simply type `node Onebot.js` and you should be ready to go!

## Development

You may revise Onebot's core as much as you wish, as long as it falls under the MIT license's guidelines. Plugins are also required to be on GitHub under the MIT license in order for the developers of Onebot to not have to listen to support questions about third-party code, because that's honestly annoying.
