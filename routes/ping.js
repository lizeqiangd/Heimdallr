/**
 * 服务器与外界连同测试.
 * ping -qc 5 bilibili.com | awk -F/ '/^rtt/ { print $5 }'
 * //var order = 'ping -qc 5 ' + target_url + ' | awk -F/ \'/^rtt/ { print $5 }\'';
 */
var os = require('os');
var exec = require('child_process').exec;
var rmsg = require('./api_utils.js').get_return_object;
exports.main = function (req, res) {
    var target_url='baidu.com';
    if(req.query.target){
        target_url=req.query.target;
    }
    var order = 'ping -qc 5 ' + target_url ;
    exec(order,
        function (error, stdout, stderr) {
            if (error !== null) {
                res.send(rmsg(1, [error, stderr], 'df操作失败.'));
                return
            }
            var output=stdout.toString();
            var data={};
            data['target_url']=target_url;
            data['target_ip']=output.match("\\d+\\.+\\d+\\.+\\d+\\.+\\d+")[0];
            data['ping']=output.match('/\\d+\\.+\\d*')[0].split('/')[1];
            res.send(rmsg(0,data,'ok.'));
        }
    );
};