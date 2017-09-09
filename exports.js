exports.syntaxes = [""];
exports.descriptions = [""];

var yaml = require('js-yaml');
var fs = require('fs');
var doc = yaml.safeLoad(fs.readFileSync('config.yaml', 'utf8'));

exports.config = doc;

exports.randmsgs = ["Let's tone the random down within 3 releases."];
exports.version = doc.internalversion;

exports.registerCmd = function(syntax, desc) {
  // Please update to fit this! syntax will be [[command1, command2], opts] but desc stays the same
  // Will remove previous code in a later update, so update quickly.
  var descgud = desc === undefined ? "No description provided." : desc;
  var command = typeof syntax === "object" ? doc.prefix + syntax[0].join("|" + doc.prefix) : syntax.toString().split(" ")[0];
  var opts = typeof syntax === "object" ? syntax[1] : syntax.split(" ").slice(1).join(" ");
  var syntaxopts = syntax[1] === undefined ? "" : syntax[1];
  var syntaxgud = "<" + command + "> " + opts;
  console.log(syntaxgud)
  if (exports.syntaxes.indexOf(syntaxgud) == -1 && exports.descriptions.indexOf(descgud) == -1) {
    exports.syntaxes.push(syntaxgud);
    exports.descriptions.push(descgud);
  }
}

exports.makeCommand = function(code, syntax, desc) {
  var onebotdesc = desc === undefined ? "No description provided." : desc
  if (exports.syntaxes.indexOf(syntax) == -1 && exports.descriptions.indexOf(desc) == -1) {
    exports.syntaxes.push(syntax);
    exports.descriptions.push(onebotdesc);
  }
}
