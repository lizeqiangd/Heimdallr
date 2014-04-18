/*
 * GET ping page.
 */
var os = require('os');
var exec = require('child_process').exec;
var data = [];
var hostList = [
    'baidu.com',
    'google.com',
    'bitbucket.com',
    'github.com'
];
for (var i = hostList.length - 1; i >= 0; i--) {
    var order = 'ping -qc 3 ' + hostList[i] + ' | awk -F/ \'/^rtt/ { print $5 }\'';
    exec(order,
        function (error, stdout, stderr) {
            var item = stdout.toString();
            data.push([hostList[i], item]);
            if (error !== null) {
                console.log('exec error: ' + error);
            }
        }
    );
}
    
exports.main = function(req, res){
    for (var i = hostList.length - 1; i >= 0; i--) {
        var order = 'ping -qc 3 ' + hostList[i] + ' | awk -F/ \'/^rtt/ { print $5 }\'';
        exec(order,
            function (error, stdout, stderr) {
                var item = stdout.toString();
                data.push([hostList[i], item]);
                if (error !== null) {
                    console.log('exec error: ' + error);
                }
            }
        );
    }
    res.send(data);
};