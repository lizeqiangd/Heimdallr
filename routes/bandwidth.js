// netstat -N -i | awk '{if ($1 > 0 && $4 > 0) print $1,$4,$8}' | grep -i -v name | uniq

/*
 * GET online page.
 */
var os = require('os');
var data = [];

var exec = require('child_process').exec;
var order = 'netstat -n -i | awk \'{if ($1 > 0 && $4 > 0) print $1","$4","$8}\' | grep -i -v name | uniq';

exec(order,
    function (error, stdout, stderr) {
        var item = stdout.toString().split('\n');
        for (var i = item.length - 2; i >= 1; i--) {
            var ps = item[i].split(',');
            console.log(ps);
            data.push(ps);
        }
        console.log('stderr: ' + stderr);
        if (error !== null) {
            console.log('exec error: ' + error);
        }
    }
);


exports.main = function(req, res){
  res.send(data);
};