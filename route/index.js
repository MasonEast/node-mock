const api = require('../models/apis')
const project = require('../models/projects')
const request = require('request');

module.exports = {
    routePost: async ({ params, query }) => {
        const { name, url } = query
        let res = {}
        switch (params) {
            case 'home':
                return res
            case 'addProject':
                console.log(name, url)
                // if(await project.selectOne({name})){
                //     return
                // }
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
                console.log(params)
                return await project.selectAll()

        }
    },

    routeMock: async ({ params, body = {}, method = 'get' }) => {
        console.log(params, body, method)
        api.selectOne({ url: body.url }).then(res => {
            console.log(111, res)
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
    },
}



