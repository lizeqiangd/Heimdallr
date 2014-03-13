var os = require('os');
console.log();
console.log('----host name-----');
console.log(os.hostname());
console.log('----type----');
console.log(os.type());
console.log('----platform----');
console.log(os.platform());
console.log('----arch----');
console.log(os.arch());
console.log('----release version----');
console.log(os.release());
console.log('----os uptime----');
console.log(os.uptime()/3600);
console.log('----load avg----');
console.log(os.loadavg());
console.log('----total momenry');
console.log(os.totalmem()/(1024*1024));
console.log('----free men----');
console.log(os.freemem()/(1024*1024));
console.log('----cpu info----');
console.log(os.cpus().length);
console.log(os.cpus());
console.log('----network interfaces----');
console.log(os.networkInterfaces());