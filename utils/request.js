import axios from 'axios'
import Qs from 'qs'
const querystring = require('querystring');

export const requestGet = async (params) => {
    let res = await axios({
        method: 'get',
        url: params.url
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
    return res
}
