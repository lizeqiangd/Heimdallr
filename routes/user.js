// /usr/bin/awk -F: '{ if ($3<=499) print "system,"$1","$6;else print "user,"$1","$6; }' < /etc/passwd
/*
 * GET users listing.
 */

var os = require('os');
var data = [];

var exec  = require('child_process').exec;
var order = '/usr/bin/awk -F: \'{ if ($3<=499) print "system,"$1","$6;else print "user,"$1","$6; }\' < /etc/passwd';
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