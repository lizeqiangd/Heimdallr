/*
 * GET diskfile page. 
 * /bin/df |awk '{print $1","$2","$3","$4","$5","$6}'
 * @edit by:Lizeqiangd.
 */
var os = require('os');
var exec = require('child_process').exec;
var rmsg = require('../api/utils.js').get_return_object;
exports.main = function(req, res){
    exec('/bin/df |awk \'{print $1","$2","$3","$4","$5","$6}\'',
        function (error, stdout, stderr) {
            if (error !== null) {
                res.send(rmsg(2,error,'df操作失败.'));
                return 
            }
            var data=[];
            var item = stdout.toString().split('\n');
            var title=item[0].split(',');
            for (var i =1; i <item.length-1; i++) {
                var disk = item[i].split(',');
                var disk_data={};
                disk_data[title[0]]=disk[0];
                disk_data[title[1]]=disk[1];
                disk_data[title[2]]=disk[2];
                disk_data[title[3]]=disk[3];
                disk_data[title[4]]=disk[4];
                disk_data[title[5]]=disk[5];
                // disk_data['Filesystem']=disk[0];
                // disk_data['1K-blocks']=disk[1];
                // disk_data['Used']=disk[2];
                // disk_data['Available']=disk[3];
                // disk_data['Use%']=disk[4];
                // disk_data['Mounted_on']=disk[5];
                // data[i]=disk_data;
                data.push(disk_data);
            }            
            res.send(rmsg(0,data,'获取数据完成'));
            console.log(data);
        }
    );  
};