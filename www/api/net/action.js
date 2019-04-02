let mysql = require("mysql");
const moment = require('moment');

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

module.exports = {
    async save(ctx, next) {
        let data=ctx.query.obj;
        data =  JSON.parse(data);
        let sqlSend='insert into task ( url , sendData , createAt ) values ( "'+data.url+'" , "' +data.date+ '" , "'+ moment().format('YYYY-MM-DD h:mm:ss') +'")';
        connection.query(sqlSend);
        ctx.body={
            "data":true,
            "state": {},
            "msg": "success"
        };
    },

    async getList(ctx,next){
        var promise = new Promise(function (resolve, reject) {
            connection.query('SELECT * FROM task',function(err,results){
                if (results) {
                    resolve(results);
                }
                if (err) {
                    console.log(err);
                }
            });
        });
        promise.then(function (value) {
            ctx.body={
                "data":value,
                "state": {},
                "msg": "success"
            };
        }, function (value) {
            console.log(value);
        });
        return promise;
    },

    async delete(ctx,next){
        connection.query('DELETE FROM task WHERE id = '+ctx.query.id+'');
        ctx.body={
            "data":true,
            "state": {},
            "msg": "success"
        };
    }
}