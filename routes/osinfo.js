/**
 * 获取服务器信息.
 */
var os = require('os');
var api=require('./api_utils.js');
var rmsg=api.get_return_object;
var check_access_key_vaild=api.check_access_key_vaild;

var server_time = require('./api_utils.js').get_server_time;
var format = function (ss) {
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
    var strSecond = second < 10 ? "0" + second : second;
    return strDay + "days " + strHour + "hours " + strMinute + "minutes " + strSecond + "seconds";
};
exports.main = function (req, res) {
    var info = os.type() + ' ' + os.arch() + ' ' + os.release();
    var hostname = os.hostname();
    var time = new Date().toString();
    var uptime = format(os.uptime());
    var data = {};
    data['info'] = info;
    data['server_time'] = server_time();
    data['server_date'] = time;
    data['hostname'] = hostname;
    data['uptime'] = uptime;
    data['uptime_uinx_seconds'] = os.uptime();
    data['is_admin']=check_access_key_vaild('123');
    res.send(rmsg(0, data, 'ok.'));
};