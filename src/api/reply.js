import request from "../axios";

export function getRepliesByBlogId(id) {
    return request({
        url: '/blogs/' + id + '/comments',
        method: 'get'
    })
}

export function sendReply(data) {
    return request({
        url: '/comments',
        method: 'post',
        data
    })
}

export function deleteReplyById(id) {
    return request({
        url: '/comments/' + id,
        method: 'delete'
    })
}
