const Koa = require('koa')
const next = require('next')
const Router = require('koa-router')
const { routePost, routeGet, routeDelete, routeMock } = require('./route')
const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const bodyParser = require('koa-bodyparser')
const koaBody = require("koa-body");

const server = new Koa()
const router = new Router()

server.use(bodyParser())

// server.use(koaBody({
//     multipart: true,
//     strict: false,                           //设为false, 为了方便接受delete请求
//     formidable: {
//         maxFileSize: 200 * 1024 * 1024
//     }
// }))

//next页面api接口
router.post('/api/:page', async ctx => {
    await routePost({ params: ctx.params.page, query: ctx.request.body }).then(res => {
        return ctx.body = {
            msg: 'success',
            data: res
        }
    })
})
router.get('/api/:page', async ctx => {
    await routeGet({ params: ctx.params.page }).then(res => {
        return ctx.body = {
            msg: 'success',
            data: res
        }
    })
})

router.delete('/api/:page', async ctx => {
    await routeDelete({ params: ctx.params.page, query: ctx.request.body }).then(res => {
        return ctx.body = {
            msg: 'success',
            data: res
        }
    })
})

//mock数据接口
router.all('/mock/:project_id/*', async ctx => {
    const { method, body } = ctx.request
    await routeMock({ params: ctx.params, body, method }).then(res => {
        return ctx.body = {
            msg: 'success',
            data: JSON.parse(res)
        }
    })
})

//next页面接口
app.prepare()
    .then(() => {

        // 首页
        router.get('/', async ctx => {
            await app.render(ctx.req, ctx.res, '/', ctx.query)
            ctx.respond = false
        })
        // 项目
        router.get('/project', async ctx => {
            await app.render(ctx.req, ctx.res, `/project`, ctx.query)
            ctx.respond = false
        })

        // 如果没有配置nginx做静态文件服务，下面代码请务必开启
        router.get('*', async ctx => {
            await handle(ctx.req, ctx.res)
            ctx.respond = false
        })
        // 防止出现控制台报404错误
        server.use(async (ctx, next) => {
            ctx.res.statusCode = 200
            await next()
        })
        server.use(router.routes()).use(router.allowedMethods())
        server.listen(port, () => {
            console.log(`> Ready on http://localhost:${port}`)
        })
    })

