module.exports = {
    async default(ctx, next) {
        ctx.body = 'default'
    },
    async hello(ctx, next) {
        ctx.body = 'hello'
    },
    async test(ctx, next) {
        ctx.body = {
            data: '这是一个json数据'
        }
    }
}