// PROCPS_FROMLEN=40 /usr/bin/w -h | /usr/bin/awk '{print $1","$3","$4","$5}'

/*
 * GET online page.
 */
var os = require('os');
var data = [];

var exec = require('child_process').exec;
var order = 'PROCPS_FROMLEN=40 /usr/bin/w -h | /usr/bin/awk \'{print $1","$3","$4","$5}\'';
exec(order,
    function (error, stdout, stderr) {
        var item = stdout.toString().split('\n');
        for (var i = item.length - 2; i >= 1; i--) {
            var ps = item[i].split(',');
            data.push(ps);
        }
        if (error !== null) {
            console.log('exec error: ' + error);
        }
    }
);

exports.main = function(req, res){
    exec(order,
        function (error, stdout, stderr) {
            var item = stdout.toString().split('\n');
            for (var i = item.length - 2; i >= 1; i--) {
                var ps = item[i].split(',');
                data.push(ps);
            }
            if (error !== null) {
                console.log('exec error: ' + error);
            }
        }
    );
    res.send(data);
};