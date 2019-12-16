const api = require('../models/apis')
const project = require('../models/projects')
const request = require('request');

module.exports = {
    routePost: async ({ params, query }) => {
        const { id, name, url, desc, head, method, body, data } = query
        let res = {}
        switch (params) {
            case 'home':
                return res
            case 'addProject':
                return await project.add({ name, url, desc })
            case 'addInterface':
                return await api.addApi({ project_id: id, name, url, desc, head, method, body, data })
            case 'getInterface':
                return await api.selectAllApi(id)
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
        console.log(params[0], body, method)
        let res = await api.findOneApiByUrl({ url: params[0], project_id: params.url, method })
        return res.data
    },
}



