// const Koa = require('koa')
// const cors = require('koa-cors')
// const bodyParser = require('koa-bodyparser')
// const koaBody = require('koa-body');
// const db = require('./db')
// const router = require('./route')
// const Koa_Session = require('koa-session');
// const fs = require('fs')

// const app = new Koa()

// try {
//     fs.accessSync(`${process.cwd()}/mock_db/app.sqlite`, fs.F_OK)
//     console.log('connecting the mock database')
// } catch (e) {
//     fs.mkdirSync('mock_db')
// fs.copyFileSync(path.resolve(__dirname, `./db/app.sqlite`), `${process.cwd()}/mock_db/app.sqlite`, function (err) {
//     if (err) {
//         console.log('create mock database failed.')
//     } else {
//         console.log('create mock database successfully.')
//     }
// })
// }

//file:test.js
var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('/tmp/1.db', function () {
    db.run("create table test(name varchar(15))", function () {
        db.run("insert into test values('hello,world')", function () {
            db.all("select * from test", function (err, res) {
                if (!err)
                    console.log(JSON.stringify(res));
                else
                    console.log(err);
            });
        })
    });
});

//解除跨域限制， 这里用于demo， 这样做是不安全的
// app.use(cors({
//     origin: '*'
// }))

// //解析post请求的中间件
// app.use(bodyParser());
