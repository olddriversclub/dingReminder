/**
 * 钉钉推送定时服务
 *
 */
const schedule = require("node-schedule");

schedule.scheduleJob("0 0 7 * * 1-5", function () {
    // TODO: ....
    // console.log("scheduleCronstyle:" + new Date());
    // job();
});