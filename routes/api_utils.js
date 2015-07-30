/**
 * This is a class of ZweiteHorizont Server.
 * SystemManager
 */
var os = require('os');
var crypto = require('crypto');
var self = {
    //获取时间戳格式
    get_formated_time: function (format_str) {
        if (!Date.prototype.format) {
            Date.prototype.format = function (fmt) { //author: meizz
                var o = {
                    "M+": this.getMonth() + 1, //月份
                    "d+": this.getDate(), //日
                    "h+": this.getHours(), //小时
                    "m+": this.getMinutes(), //分
                    "s+": this.getSeconds(), //秒
                    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
                    "S": this.getMilliseconds() //毫秒
                };
                if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
                for (var k in o)
                    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                return fmt;
            }
        }
        if(format_str==''||format_str==null){
            format_str='yyyy-MM-dd hh:mm:ss';
        }
        var r = new Date().format(format_str) + "";
        return r;
    },
    //MD5验证.
    md5: function (str) {
        var md5sum = crypto.createHash('md5');
        md5sum.update(str);
        str = md5sum.digest('hex');
        return str;
    },
    sha1: function (str) {
        var md5sum = crypto.createHash('sha1');
        md5sum.update(str);
        str = md5sum.digest('hex');
        return str;
    },
    //获取系统当前时间,'yyyy-MM-dd hh:mm:ss'
    get_server_time: function () {
        return self.get_formated_time('yyyy-MM-dd hh:mm:ss');
    },
    //返回用户数据
    get_return_object: function (code, data, msg) {
        var return_object = {};
        return_object['code'] = code;
        return_object['data'] = data;
        if (msg) {
            return_object['msg'] = msg;
        }
        return return_object;
    },
    get_unique_id: function () {
        var code = this.get_server_time() + Math.random();
        var return_id =self.sha1(code);
        return return_id;
    },
    check_access_key_vaild: function (key) {
        var md5_hostname = self.md5(os.hostname());
        var now_date=self.md5(self.get_formated_time('yyyy-MM-dd hh:mm'));
        var salt_key=self.md5('Lizeqiangd');
        var final_key=self.sha1(md5_hostname+'&'+now_date+'&'+salt_key);
        return md5_hostname+now_date+salt_key;
        return final_key==key;
    },
    EOF: 0
}
module.exports = self