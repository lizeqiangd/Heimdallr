/*
 * GET osinfo page.
 */
var os = require('os');

var format = function(ss) {
   var mi = 60;
   var hh = mi * 60;
   var dd = hh * 24;
   var day = Math.floor(ss / dd);
   var hour = Math.floor((ss - day * dd) / hh);
   var minute = Math.floor((ss - day * dd - hour * hh) / mi);
   var second = Math.floor((ss - day * dd - hour * hh - minute * mi) / ss);
   var strDay = day < 10 ? "0" + day : day;
   var strHour = hour < 10 ? "0" + hour : hour;
   var strMinute = minute < 10 ? "0" + minute : minute;
   return strDay + "days " + strHour + "hours " + strMinute + "minutes";
};

var info = os.type() + ' ' + os.arch() + ' ' + os.release();
var hostname = os.hostname();
var time = new Date();
var uptime = format(os.uptime());

var data = [info, hostname, time, uptime];

exports.main = function(req, res){
  res.send(data);
};