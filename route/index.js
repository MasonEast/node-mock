const api = require('../models/apis')
const project = require('../models/projects')
const request = require('request');

module.exports = {
    routePost: async ({ params, query }) => {
        const { id, name, url, desc, user_id, headers, method, body, data } = query
        switch (params) {
            case 'addProject':
                return await project.add({ name, url, desc, user_id }).then(res => res).catch(error => error.message)
            case 'addInterface':
                return await api.addApi({ project_id: id, name, url, desc, headers, method, body, data }).then(res => res).catch(error => error.message)
            default:
                return '接口请求出错'
        }
    },

    routeGet: async ({ params, query }) => {
        switch (params) {
            case 'project':
                return await project.selectAll().then(res => res).catch(error => error.message)
            case 'getInterface':
                return await api.selectAllApi(query.id).then(res => res).catch(error => error.message)
            default:
                return '接口请求出错'

        }
    },

    routeDelete: async ({ params, query }) => {
        const { id } = query
        switch (params) {
            case 'project':
                await api.deleteApi(id)                     //删除项目的同时清空对应的api接口
                return await project.deleteOne(id).then(res => res).catch(error => error.message)
            case 'interface':
                return await api.deleteOneApi(id).then(res => res).catch(error => error.message)
            default:
                return '接口请求出错'
        }
    },

    routeMock: async ({ params, body = {}, url, header, method = 'get' }) => {
        let headers = ''
        header['content-type'] && (headers = { contentType: header['content-type'] })
        let res = await api.findOneApiByUrl({ url: params[0], project_id: params.project_id, method, headers })
        let result = '接口请求错误（可能原因： url存在问题'
        if (res && res.headers !== JSON.stringify(headers)) {
            return '接口请求错误（可能原因： headers存在问题'
        }
        if (res && res.body !== JSON.stringify(body)) {
            return '接口请求错误（可能原因： body存在问题'
        }
        res && (result = res.data)
        return JSON.parse(result)
    },
}



