// PROCPS_FROMLEN=40 /usr/bin/w -h | /usr/bin/awk '{print $1","$3","$4","$5}'

/*
 * GET online page.
 */
var os = require('os');
var rmsg = require('./api_utils.js').get_return_object;
var exec = require('child_process').exec;
var order = 'PROCPS_FROMLEN=40 /usr/bin/w -h | /usr/bin/awk \'{print $1","$3","$4","$5}\'';
exports.main = function (req, res) {
    exec(order,
        function (error, stdout, stderr) {
            if (error !== null) {
                res.send(rmsg(1, [error, stderr], 'df²Ù×÷Ê§°Ü.'));
                return
            }
            var item = stdout.toString().split('\n');
            var data=[];
            for (var i = 0; i<item.length-1; i++) {
                var t = item[i].split(',');
                var ps={};
                ps['user']=t[0];
                ps['from']=t[1];
                ps['date']=t[2];
                ps['idle']=t[3];
                data.push(ps);
            }
            res.send(rmsg(0,data,'ok'));
        }
    );
};