/*
 * GET ip page.
 */
var os = require('os');

var data = [];

exports.main = function(req, res){
    var net = os.networkInterfaces();
    var iptem = {};
    for (var x in net){
        var interfc = x;
        for (var count in x){
            var item = net[x][count];
            for (var att in item){
                iptem['interface'] = interfc;
                iptem[att] = item[att];
            }
            data.push([iptem['interface'],iptem['address']]);
        }
    }
    res.send(data);
};