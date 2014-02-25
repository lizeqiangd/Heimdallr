/*
 * GET numofcore page.
 */
var os = require('os');

exports.main = function(req, res){
  res.send(os.cpus().length);
};