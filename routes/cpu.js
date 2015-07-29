/*
 * GET loadavg page.
 */
var os = require('os');
var rmsg = require('./api_utils.js').get_return_object;
exports.main = function (req, res) {
    var numberofcores = os.cpus().length;
    var data = {};
    data['cpu1'] = os.loadavg()[0].toFixed(2);
    data['cpu5'] = os.loadavg()[1].toFixed(2);
    data['cpu15'] = os.loadavg()[2].toFixed(2);
    data['cores'] = numberofcores;
    res.send(rmsg(0, data, 'ok.'));
};