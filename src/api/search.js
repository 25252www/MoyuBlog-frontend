import request from "../axios"

export function searchBlog(keyword) {
    return request({
        url: '/search/' + keyword,
        method: 'get'
    })
}
