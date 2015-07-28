//cat /etc/resolv.conf
/*
 * GET dns page.
 */
var os = require('os');
var rmsg = require('./api_utils.js').get_return_object;
var exec = require('child_process').exec;
var data = [];

exports.main = function(req, res){
    exec('/bin/df -h|awk \'{print $1","$2","$3","$4","$5","$6","$7","$8","$9}\'',
        function (error, stdout, stderr) {
            var item = stdout.toString().split('\n');
            for (var i = item.length - 1; i >= 1; i--) {
                var disk = item[i].split(',');
                var tmp = [disk[0], disk[1], disk[2], disk[3], disk[4], disk[disk.length-1]];
                data.push(tmp);
            }
            if (error !== null) {
                console.log('exec error: ' + error);
            }
        }
    );
    res.send(data);
};