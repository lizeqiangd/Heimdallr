/**
 * netstat -N -i | awk '{if ($1 > 0 && $4 > 0) print $1,$4,$8}' | grep -i -v name | uniq
 */
var os = require('os');
var exec  = require('child_process').exec;
var rmsg = require('./api_utils.js').get_return_object;
var order = 'netstat -n -i | awk \'{if ($1 > 0 && $4 > 0) print $1","$4","$8}\' | grep -i -v name | uniq';

var RX    = 0;
var TX    = 0;
var delta_RX=0;
var delta_TX=0;
exports.main = function(req, res){
    exec(order,
        function (error, stdout, stderr) {
            if (error !== null) {
                res.send(rmsg(1,error,'df操作失败.'));
                return
            }
            var item = stdout.toString().split('\n');
            for (var i = item.length - 2; i >= 1; i--) {
                var ps = item[i].split(',');
                delta_RX=parseInt(ps[1])-RX;
                delta_TX=parseInt(ps[2])-TX;
                RX = parseInt(ps[1]);
                TX = parseInt(ps[2]);
            }
            var data = {};
            data['delta_RX']=delta_RX;
            data['delta_TX']=delta_TX;
            data['TX']=TX;
            data['RX']=RX;
            res.send(rmsg(0,data,'bandwidth 数据获取成功'));
        }
    );

};