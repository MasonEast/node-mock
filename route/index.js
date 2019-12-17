const api = require('../models/apis')
const project = require('../models/projects')
const request = require('request');

module.exports = {
    routePost: async ({ params, query }) => {
        const { id, name, url, desc, user_id, head, method, body, data } = query
        let res = {}
        switch (params) {
            case 'home':
                return res
            case 'addProject':
                return await project.add({ name, url, desc, user_id })
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
        switch (params) {
            case 'project':
                return await project.selectAll()

        }
    },

    routeDelete: async ({ params, query }) => {
        const { id } = query
        switch (params) {
            case 'project':
                await api.deleteApi(id)                     //删除项目的同时清空对应的api接口
                return await project.deleteOne(id)
            case 'interface':
                return await api.deleteOneApi(id)
        }
    },

    routeMock: async ({ params, body = {}, method = 'get' }) => {
        let res = await api.findOneApiByUrl({ url: params[0], project_id: params.project_id, method })
        return res.data
    },
}



