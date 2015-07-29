/**
 * ÄÚ´æ½çÃæ
 */
var os = require('os');
var rmsg = require('./api_utils.js').get_return_object;
exports.main = function(req, res){
    var total =os.totalmem();
    var free  = os.freemem();
    var used  = total-free;
    var data  = {};
    data['used']=used;
    data['free']=free;
    data['total']=total;
    res.send(rmsg(0,data,'ok.'));
};