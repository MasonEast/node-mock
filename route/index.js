const api = require('../models/apis')
const project = require('../models/projects')
const request = require('request');
// request('https://www.baidu.com', function (error, response, body) {
//     console.log(body)//打印百度首页html内容
// })

// or

// request({ url: 'https://www.baidu.com' }, function (error, response, body) {
//     console.log(body)//打印百度首页html内容
// })

module.exports = {
    routePost: async ({ params, query }) => {
        const { name, url } = query
        let res = {}
        switch (params) {
            case 'home':
                return res
            case 'add':
                console.log(name, url)
                return await project.add({ name, url })
            case 'mockrequest':
                apis.selectOne({ id }).then(res => {
                    const { url, method, body, headers } = res
                    request({
                        method,
                        url,
                        headers,
                        body
                    }, (error, response, body) => {
                        if (error) throw error
                        return body
                    })
                })
        }
    },
    routeGet: async ({ params }) => {
        let res = {}
        switch (params) {
            case 'project':
                return await project.selectAll()

        }
    }
}



