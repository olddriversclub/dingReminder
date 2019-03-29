let mysql = require("mysql");
let utils = require("../utils/utils");

let connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456",
    // database: "water_test"
    database: "ding_teacher"
});
connection.connect();

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
