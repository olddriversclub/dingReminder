let mysql = require("mysql");
let utils = require("../utils/utils");

let connection = mysql.createConnection({
    host: "192.168.20.179",
    user: "admin",
    password: "123456",
    // database: "water_test"
    // database: "ding_teacher"
    database:"ding_teacher_test",
    port:'3306'
});

connection.connect(function(err){
    if(err){
        console.log(err);
    }else{
        console.log('success');
    }
});

async function myWait(fun) {
    return new Promise((res, rej) => {
        fun(res);
    });
}

//UPDATE `ding_teacher`.`task` SET `isSend`='1' WHERE `id`='1';
async function morning(params) {
    let { currentdate } = utils.getNowFormatDate();
    let today = await myWait(res => {
        connection.query(
            `SELECT * FROM task where sendData='${currentdate}';`,
            function(error, results, fields) {
                if (error) {
                    console.log(error);
                    return;
                }
                res(results);
            }
        );
    });
    if (today.length) {
        today = today[0];
        await myWait(res => {
            connection.query(
                `UPDATE \`task\` SET \`isSend\`='1' WHERE \`id\`='${
                    today.id
                }';`,
                function(err, result) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                    res();
                }
            );
        });
    }
    // connection.end();
    return today;
}

module.exports = {
    morning
};
