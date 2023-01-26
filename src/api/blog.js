import request from "../axios"

export function getCurrentPage(page) {
    return request({
        url: '/blogs?currentPage=' + page,
        method: 'get'
    })
}

export function getBlogById(id) {
    return request({
        url: '/blogs/' + id,
        method: 'get'
    })
}

export function editBlog(data) {
    return request({
        url: '/blogs/edit',
        method: 'post',
        data
    })
}

export function getBlogList() {
    return request({
        url: '/blogs/all',
        method: 'get'
    })
}

export function deleteBlogById(id) {
    return request({
        url: '/blogs/delete/' + id,
        method: 'delete'
    })
}

export function getReplyByBlogId(id) {
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
