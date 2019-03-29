const Koa = require('koa')
const app = new Koa()
const bodyParser = require('koa-bodyparser')
const registerRouter = require('./routes')
const serve = require('koa-static')
const path = require('path')
const open = require('open')
const logger = require('./logger')
const argvs = require('./process.args')
const os = require('os')
const services = require('./services/send-to-dd')

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

let port = argvs.port || 1001;

app.listen(port)
    .on("error", err => {
        logger.error(err)
    })
    .on("listening", () => {
        logger.log('start successed at ' + port)
        if(argvs.mode === 'dev') {
            open(`127.0.0.1:${port}`, {app: [os.platform().indexOf('win') === 0 ? 'chrome' : 'google chrome']});
        }
    });