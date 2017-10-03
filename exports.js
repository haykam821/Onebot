exports.syntaxes = [""];
exports.descriptions = [""];

var yaml = require('js-yaml');
var fs = require('fs');
var doc = yaml.safeLoad(fs.readFileSync('config.yaml', 'utf8'));

exports.config = doc;
exports.version = doc.internalversion;

exports.registerCmd = function(syntax, desc) {
  // Please update to fit this! syntax will be [[command1, command2], opts] but desc stays the same
  // Will remove previous code in a later update, so update quickly.
  var descgud = desc === undefined ? "No description provided." : desc;

  for (i in syntax) {
    if (exports.syntaxes.indexOf(syntax[i]) == -1) {
      exports.syntaxes.push(syntax[i]);
      exports.descriptions.push(descgud);
    }
  }

}

exports.makeCommand = function(code, syntax, desc) {
  var onebotdesc = desc === undefined ? "No description provided." : desc
  if (exports.syntaxes.indexOf(syntax) == -1 && exports.descriptions.indexOf(desc) == -1) {
    exports.syntaxes.push(syntax);
    exports.descriptions.push(onebotdesc);
  }
}
