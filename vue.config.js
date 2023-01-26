const CompressionPlugin = require("compression-webpack-plugin");

// vue.config.js
module.exports = {
    productionSourceMap: false,
    devServer: {
        port: 8081,
        //以上的ip和端口是我们本机的;下面为需要跨域的
        //代理请求路径
        proxy: {
            '/api/python': {
                target: "http://localhost:5000/",
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api/python': ''
                }
            },
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
                args[0].title = '摸鱼战士的小站'
                return args
            })
    },
    configureWebpack: {
        plugins: [new CompressionPlugin()],
        module: {
            rules: [{
                test: /\.mjs$/,
                include: /node_modules/,
                type: "javascript/auto"
            }]
        },
        externals: {
            'vue': 'Vue',
            'highlight.js': 'hljs',
            'element-plus': 'ElementPlus',
        }
    }
}
