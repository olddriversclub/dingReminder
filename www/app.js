const Koa = require('koa')
const app = new Koa()
const bodyParser = require('koa-bodyparser')
const registerRouter = require('./routes')
const serve = require('koa-static')
const path = require('path')
const open = require('open')
const logger = require('./logger') // 简单日志
const argvs = require('./process.args')
const os = require('os')
require('./services/send-to-dd') // 钉钉发送定时服务

app.use(bodyParser())

app.use(serve(path.resolve(__dirname, "../static"), {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    index: 'index.html',
}));

app.use(async (ctx, next) => {
    ctx.argvs = argvs
    ctx.logger = logger
    await next()
})

app.use(registerRouter())

app.listen(argvs.port || 1001)
    .on("error", err => {
        logger.error(err)
    })
    .on("listening", function () {
        let host = `127.0.0.1:${this.address().port}`
        logger.log(`start successed at ${host}`)
        if(argvs.mode === 'dev') {
            open(host, {app: [os.platform().indexOf('win') === 0 ? 'chrome' : 'google chrome']});
        }
    });