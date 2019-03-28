var Service = require("node-windows").Service;

// Create a new service object
var svc = new Service({
    name: "xiaoYuanBaoReminder",
    description: "校园宝早报机器人",
    script: require("path").join(__dirname, "./win-service/to-teacher.js")
});

// Listen for the "install" event, which indicates the
// process is available as a service.
// svc.on('install', function () {
//     svc.start();
// });

svc.install();
// svc.uninstall();
