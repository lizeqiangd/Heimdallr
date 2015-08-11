/**
 * netstat -N -i | awk '{if ($1 > 0 && $4 > 0) print $1,$4,$8}' | grep -i -v name | uniq
 */
var os = require('os');
var exec = require('child_process').exec;
var rmsg = require('./api_utils.js').get_return_object;
var order = 'netstat -n -i | awk \'{if ($1 > 0 && $4 > 0) print $1","$4","$8}\' | grep -i -v name | uniq';

var RX = 0;
var TX = 0;
var delta_RX = 0;
var delta_TX = 0;
exports.main = function (req, res) {
    exec(order,
        function (error, stdout, stderr) {
            if (error !== null) {
                res.send(rmsg(1, [error, stderr], 'df����ʧ��.'));
                return
            }
            var rdata = [];
            var item = stdout.toString().split('\n');
            item.splice(0, 1);
            item.splice(-1, 1);
            console.log(item);
            for (var i = 0; i <item.length; i++) {
                var ps = item[i].split(',');
                delta_RX = parseInt(ps[1]) - RX;
                delta_TX = parseInt(ps[2]) - TX;
                RX = parseInt(ps[1]);
                TX = parseInt(ps[2]);
                var data = {};
                data['name']=ps[0];
                //data['delta_RX'] = delta_RX;
                //data['delta_TX'] = delta_TX;
                data['TX'] = TX;
                data['RX'] = RX;
                rdata.push(data);
            }
            res.send(rmsg(0, rdata, 'ok.'));
        }
    );
};