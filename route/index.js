const api = require('../models/apis')
const project = require('../models/projects')
const user = require('../models/users')

const response = (status, res) => {
    return {
        status,
        data: res
    }
}

module.exports = {
    routePost: async ({ params, query }) => {
        const { email, password, id, name, url, desc, user_id, headers, method, body, data } = query
        switch (params) {
            case 'register':
                let validate = await user.validate({ email })
                console.log(33, validate)
                if (validate) {
                    return response(1, '哎呀，该邮箱已被注册啦')
                }
                return await user.add({ email, password }).then(res => response(0, res)).catch(error => response(1, error.message))
            case 'login':
                return await user.selectOne({ email, password }).then(res => response(0, res)).catch(error => response(1, error.message))
            case 'addProject':
                let validate2 = await project.validate({ name, user_id })
                console.log(44, validate2)
                if (validate2) {
                    return response(1, '哎呀，该项目已被注册啦')
                }
                return await project.add({ name, url, desc, user_id }).then(res => response(0, res)).catch(error => response(1, error.message))
            case 'addInterface':
                return await api.addApi({ project_id: id, name, url, desc, headers, method, body, data }).then(res => response(0, res)).catch(error => response(1, error.message))
            default:
                return '接口请求出错'
        }
    },

    routeGet: async ({ params, query }) => {
        switch (params) {
            case 'project':
                return await project.selectAll(query.user_id).then(res => response(0, res)).catch(error => response(1, error.message))
            case 'getInterface':
                return await api.selectAllApi(query.id).then(res => response(0, res)).catch(error => response(1, error.message))
            default:
                return '接口请求出错'

        }
    },

    routeDelete: async ({ params, query }) => {
        const { id } = query
        switch (params) {
            case 'project':
                await api.deleteApi(id)                     //删除项目的同时清空对应的api接口
                return await project.deleteOne(id).then(res => response(0, res)).catch(error => response(1, error.message))
            case 'interface':
                return await api.deleteOneApi(id).then(res => response(0, res)).catch(error => response(1, error.message))
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



