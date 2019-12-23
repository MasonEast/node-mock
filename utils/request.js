import axios from 'axios'
import Qs from 'qs'
import { message } from 'antd'

export const requestGet = async (params) => {
    let res = await axios({
        method: 'get',
        url: params.url,
        params: params.query
    })
    return res
}

export const requestPost = async (params) => {
    let res = await axios({
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        method: params.method || 'post',
        url: params.url,
        data: Qs.stringify(params.body)
    })
    res.data.status ? message.error('error') : message.success('success')
    return res
}
