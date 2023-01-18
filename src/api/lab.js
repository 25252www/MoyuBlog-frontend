import request from "../axios"

export function doSegmentation(data) {
    return request({
        url: '/python/doSegmentation',
        method: 'post',
        data
    })
}

export function getQiniuUploadToken() {
    return request({
        url: '/python/getQiniuUploadToken',
        method: 'get'
    })
}
