console.log('Server Start.');
/**
 * Module dependencies.
 */
var express = require('express');
var http = require('http');
var path = require('path');

var routes = require('./routes');
var user = require('./routes/user');
var mem = require('./routes/mem');
var cpu = require('./routes/cpu');
var osinfo = require('./routes/osinfo');
var ip = require('./routes/ip');
var df = require('./routes/df');
var ps = require('./routes/ps');
var online = require('./routes/online');
var bandwidth = require('./routes/bandwidth');
var ping = require('./routes/ping');

console.log('Start Express engine.');
var app = express();

console.log('Start Express system configuration.');
app.set('port', 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

app.locals.title='Server Monitor Project Herimdallr';
app.locals.email='i@acgs.me';
app.locals.modified_by='Lizeqiangd';
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

console.log('Start Express routing configuration.');
app.get('/', routes.index);
app.get('/mem', mem.main);
app.get('/cpu', cpu.main);
app.get('/osinfo', osinfo.main);
app.get('/ip', ip.main);
app.get('/df', df.main);
app.get('/ps', ps.main);
app.get('/online', online.main);
app.get('/bandwidth', bandwidth.main);
app.get('/ping', ping.main);

console.log('Start Express HTTP Server.');
http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
