/**
 * 钉钉推送定时服务
 *
 */
const schedule = require("node-schedule");
let mysql = require("mysql");
const moment = require('moment');
let https = require('https');

let connection = mysql.createConnection({
    host: "192.168.20.179",
    user: "admin",
    password: "123456",
    database:"ding_teacher_test",
    port:'3306'
});

connection.connect();

let markdown= {
    msgtype: `markdown`,
    markdown: {
        title: `markdown标题`,
        text: `markdown内容`
    },
    at: {
        atMobiles: [],//电话号码数组
        isAtAll: false
    }
};

async function job(url) {
    markdown.markdown = {
        title: `校园宝7点早报`,
        text: `## 校园宝7点早报 行业新闻早知道
![](${url})`
    };
    markdown.at.isAtAll = true;
    sendMessage(markdown);
}

const sendMessage=(markdown)=>{
    const requestData = JSON.stringify(markdown);

    const req = https.request({
        hostname: 'oapi.dingtalk.com',
        port: 443,
        path: '/robot/send?access_token=d5e431665ffed444d5d31ca4700b241ada2eab34beaeb18fe8dfed375dc84cba',
        method: "POST",
        json: true,
        headers: {
            'Content-Type': "application/json; charset=utf-8"
        }
    });
    req.write(requestData);
    req.on('error', function (err) {
        console.error(err);
    });
    req.end();
}

schedule.scheduleJob("0 0 7 * * 1-5", function () {
    let list=[];
    console.log(moment().format('YYYY-MM-DD'));
    var promise = new Promise(function (resolve, reject) {
        connection.query("SELECT * FROM task WHERE sendData = '"+moment().format('YYYY-MM-DD')+"'",function(err,results){
            if (results) {
                resolve(results);
            }
            if (err) {
                console.log(err);
            }
        });
    });
    promise.then(function (value) {
        list=value;
        if(list.length>0){
            job(list[0].url);
        }
    }, function (value) {
        console.log(value);
    });
    return promise; 
});