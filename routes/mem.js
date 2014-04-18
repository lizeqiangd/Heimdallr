/*
 * GET mem page.
 */
var os = require('os');


exports.main = function(req, res){
    var total = Math.floor(os.totalmem()/(1024*1024));
    var free  = Math.floor(os.freemem()/(1024*1024));
    var used  = total-free;
    var data  = [0, total, used, free];
    res.send(data);
};