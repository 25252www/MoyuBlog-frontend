import request from "../axios";

export function getRepliesByBlogId(id) {
    return request({
        url: '/comment/' + id,
        method: 'get'
    })
}

export function sendReply(data) {
    return request({
        url: '/comment/add',
        method: 'post',
        data
    })
}

export function deleteReplyById(id) {
    return request({
        url: '/comment/delete/' + id,
        method: 'get'
    })
}
