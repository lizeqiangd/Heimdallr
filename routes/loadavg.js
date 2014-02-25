/*
 * GET loadavg page.
 */
var os = require('os');

var numberofcores = os.cpus().length;
var cpu1 = [os.loadavg()[0].toFixed(2), Math.floor(os.loadavg()[0]*100/numberofcores)];
var cpu5 = [os.loadavg()[1].toFixed(2), Math.floor(os.loadavg()[1]*100/numberofcores)];
var cpu15 = [os.loadavg()[2].toFixed(2), Math.floor(os.loadavg()[2]*100/numberofcores)];
var data = [cpu1, cpu5, cpu15, numberofcores];

exports.main = function(req, res){
  res.send(data);
};