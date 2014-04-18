// netstat -N -i | awk '{if ($1 > 0 && $4 > 0) print $1,$4,$8}' | grep -i -v name | uniq

/*
 * GET online page.
 */
var os = require('os');
var data = [];

var exec  = require('child_process').exec;
var order = 'netstat -n -i | awk \'{if ($1 > 0 && $4 > 0) print $1","$4","$8}\' | grep -i -v name | uniq';
var RX    = 0;
var TX    = 0;
exec(order,
    function (error, stdout, stderr) {
        var item = stdout.toString().split('\n');
        for (var i = item.length - 2; i >= 1; i--) {
            var ps = item[i].split(',');
            RX += parseInt(ps[1]);
            TX += parseInt(ps[2]);
        }
        data = [RX, TX];
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
                RX += parseInt(ps[1]);
                TX += parseInt(ps[2]);
            }
            data = [RX, TX];
            if (error !== null) {
                console.log('exec error: ' + error);
            }
        }
    );
    res.send(data);
};