// vue.config.js
module.exports = {
    devServer: {
        port: 8081,
        //以上的ip和端口是我们本机的;下面为需要跨域的
        //代理请求路径
        proxy: {
            '/api': {
                target: "http://localhost:8080/",
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        },
    },
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title= '摸鱼战士的小站'
                return args
            })
    }

}
