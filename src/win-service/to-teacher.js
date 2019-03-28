//1、引入模块  使用的http服务协议是RFC2616  nodejs的作者已经写好了，直接引入就行
let schedule = require("node-schedule");
let task = require("../tasks/xiao-yuan-bao");

let { model, send, init } = require("../utils/to-ding");

let { markdown } = model;

let { tokens } = require("../utils/get-config");

init(tokens.myTest);

async function job() {
    let today = await task.morning();
    if (!today || !today.url) {
        return;
    }
    markdown.markdown = {
        title: `校园宝7点早报`,
        text: `## 校园宝7点早报 行业新闻早知道
![](${today.url})`
    };
    markdown.at.isAtAll = true;
    send(markdown);
}

job();

function scheduleCronstyle() {
    schedule.scheduleJob("0 0 7 * * 1-5", function() {
        console.log("scheduleCronstyle:" + new Date());
        job();
    });
}

// scheduleCronstyle();
