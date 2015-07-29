/**
 * 获取本机ip信息.
 */
var os = require('os');
var rmsg = require('./api_utils.js').get_return_object;
exports.main = function (req, res) {
    var net = os.networkInterfaces();
    var iptem = {};
    var data = {};
    //for (var x in net) {
    //    var interfc = x;
    //    for (var count in x) {
    //        var item = net[x][count];
    //        for (var att in item) {
    //            iptem['interface'] = interfc;
    //            iptem[att] = item[att];
    //        }
    //        data.push([iptem['interface'], iptem['address']]);
    //    }
    //}
    res.send(rmsg(0,net,'ok.'));
};