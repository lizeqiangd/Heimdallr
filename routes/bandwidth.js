// netstat -N -i | awk '{if ($1 > 0 && $4 > 0) print $1,$4,$8}' | grep -i -v name | uniq

/*
 * GET online page.
 */
var os = require('os');
var exec  = require('child_process').exec;
var order = 'netstat -n -i | awk \'{if ($1 > 0 && $4 > 0) print $1","$4","$8}\' | grep -i -v name | uniq';

var data = [];
var RX    = 0;
var TX    = 0;
var delta_RX=0;
var delta_TX=0;
exports.main = function(req, res){
    exec(order,
        function (error, stdout, stderr) {
            var item = stdout.toString().split('\n');
            for (var i = item.length - 2; i >= 1; i--) {
                var ps = item[i].split(',');
                delta_RX=parseInt(ps[1])-RX;
                delta_TX=parseInt(ps[2])-TX;
                RX = parseInt(ps[1]);
                TX = parseInt(ps[2]);
            }
            data = [RX, TX];            
            if (error !== null) {
                console.log('exec error: ' + error);
            }
        }
    );
    res.send(data);
};