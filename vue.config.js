const {defineConfig} = require('@vue/cli-service')
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const {ElementPlusResolver} = require('unplugin-vue-components/resolvers')
const ENV = process.env.ENV;

module.exports = defineConfig({
    transpileDependencies: true
});

const serverApi = {
    // serve: 'https://api-dev.xdeas.com.cn',
    serve: 'https://api.xdeas.com.cn',
    // serve: 'https://api-test.xdeas.com.cn',
    // serve: 'https://api-pre.xdeas.com.cn',
    test: 'https://api-test.xdeas.com.cn',
    master: 'https://api.xdeas.com.cn',
    pre: 'https://api-pre.xdeas.com.cn'
}


module.exports = {
    configureWebpack: {
        plugins: [
            AutoImport({
                resolvers: [ElementPlusResolver({importStyle: false})],
            }),
            Components({
                resolvers: [ElementPlusResolver()],
            }),
        ],
    },
    devServer: {
        port:5001, //设置项目端口号这是vue项目端口
        host: "0.0.0.0", //允许所有的主机访问当前项目
        proxy: {
            '/xdeas_api': { //正则匹配到以这个开头的时候 就用代理
                target: serverApi[ENV],// 指向的是目标服务器
                changOrigin: true,  //允许跨域
                pathRewrite: {
                    '^/xdeas_api': ""
                }
            }
        }
    }
}


