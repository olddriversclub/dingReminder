/**
 * 框架自动读取api目录下所有文件夹中的controller.js文件，添加至路由
 * 并统一增加前缀'/api/文件夹'，比如如下路由访问路径分别为：
 * /api/test
 * /api/test/hello
 * /api/test/test
 */

const Router = require('koa-router')
const router = new Router()
const action = require('./action')

router.get('/', action.default)
router.get('/hello', action.hello)
router.get('/test', action.test)

module.exports = router