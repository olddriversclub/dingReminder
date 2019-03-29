const Koa = require('koa')
const app = new Koa()
const bodyParser = require('koa-bodyparser')
// const registerRouter = require('./routes')
const serve = require('koa-static')
const path = require('path')
const opn = require('opn')
const logger = require('./logger')
const argvs = require('./process.args')

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

// app.use(registerRouter())

app.listen(1001)
    .on("error", err => {
        logger.error(err)
    })
    .on("listening", () => {
        logger.log('start successed')
    });