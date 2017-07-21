var request = require('request');
var http = require('http');
var fs = require('fs');
var express = require('express'); 
var mysql = require('mysql');
var cheerio = require('cheerio'); 
var $conf = require('../conf/db'); 
var $util = require('../util/util'); 
var router = express.Router();


String.prototype.format = function(args) {
    var result = this;
    if (arguments.length > 0) {    
        if (arguments.length == 1 && typeof (args) == "object") {
            for (var key in args) {
                if(args[key]!==undefined){
                    var reg = new RegExp("({" + key + "})", "g");
                    result = result.replace(reg, args[key]);
                }
            }
        }
        else {
            for (var i = 0; i < arguments.length; i++) {
                if (arguments[i] !== undefined) {
                    var reg = new RegExp("({[" + i + "]})", "g");
                    result = result.replace(reg, arguments[i]);
                }
            }
        }
    }
    return result;
}

function html_encode(str) {
    var s = "";
    if (str.length == 0) return "";
    s = str.replace(/&/g, "&gt;");
    s = s.replace(/</g, "&lt;");
    s = s.replace(/>/g, "&gt;");
    s = s.replace(/ /g, "&nbsp;");
    s = s.replace(/\'/g, "&#39;");
    s = s.replace(/\"/g, "&quot;");
    s = s.replace(/\n/g, "<br>");
    return s;
}

function html_decode(str) {
    var s = "";
    if (str.length == 0) return "";
    s = str.replace(/&gt;/g, "&");
    s = s.replace(/&lt;/g, "<");
    s = s.replace(/&gt;/g, ">");
    s = s.replace(/&nbsp;/g, " ");
    s = s.replace(/&#39;/g, "\'");
    s = s.replace(/&quot;/g, "\"");
    s = s.replace(/<br>/g, "\n");
    return s;
}

var pool  = mysql.createPool($util.extend({}, $conf.mysql));

router.get('/', function(req, res, next) {

    var url = 'http://www.lamabang.com/baike/tag-227-id-1820.html';

    http.get(url, function(pageful) {  
        var data = '';
        pageful.on('data', function(chunk){ 
            data+=chunk;
        })
        pageful.on('end', function(){ 

            var $ = cheerio.load(data);

            // 与页面结构有关系 
            var context = $('.encyclopediaCont');

            context.find('img').each(function(i, e){
                var img_src = $(e).attr('src');

                var img_filename = (new Date()).getTime() + '.jpg'; 
                var path = '/upload/book/';
                var way = path + img_filename;

                request(img_src).pipe(fs.createWriteStream('.' + way));  

                $(e).attr({  
                    src: way
                });  
            }); 

            pool.getConnection(function(err, connection) {
                var param = req.query || req.params;

                var sql = 'INSERT INTO `article` \
                    (`userID`, `title`, `content`, `summary`, `origin`, `originlink`, `birthday`, `level`) \
                    VALUES ( "{userID}", "{title}", "{content}", "{summary}", "{origin}", "{originlink}", "{birthday}", "{level}")';

                     
                sql = sql.format({  
                    userID: '',
                    title: context.find(".mainTitle").text().trim(),  
                    content: html_encode(context.find(".cont").html()),     
                    summary: '摘要',  
                    origin: '辣妈帮',  
                    originlink: url,
                    birthday: '2017-07-21 00:00:00',     
                    level: 1
                }); 

                connection.query(sql, function(err, result){
                    if(err){
                        console.log('保存数据失败');  
                    } else{
                        console.log('保存数据成功');       
                    }
                    
                });                
            }); 
        }).on('error', function(){  
            console.log('读取链接地址信息失败'); 
        });

    }); 

    res.send('---页面---'); 
});

module.exports = router; 
