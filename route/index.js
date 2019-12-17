const api = require('../models/apis')
const project = require('../models/projects')
const request = require('request');

module.exports = {
    routePost: async ({ params, query }) => {
        const { id, name, url, desc, user_id, headers, method, body, data } = query
        switch (params) {
            case 'addProject':
                return await project.add({ name, url, desc, user_id })
            case 'addInterface':
                return await api.addApi({ project_id: id, name, url, desc, headers, method, body, data })
            case 'getInterface':
                return await api.selectAllApi(id)
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
        console.log(params, query)
        switch (params) {
            case 'project':
                await api.deleteApi(id)                     //删除项目的同时清空对应的api接口
                return await project.deleteOne(id)
            case 'interface':
                return await api.deleteOneApi(id)
        }
    },

    routeMock: async ({ params, body = {}, url, header, method = 'get' }) => {
        console.log(params, url, method, header, body)
        let res = await api.findOneApiByUrl({ url: params[0], project_id: params.project_id, method, header })
        return res.data
    },
}



