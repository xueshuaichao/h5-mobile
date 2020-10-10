
// http://mz-resource-server.testing1.svc.k8s.bjo.wdcloud.cc
// http://mz-gateway-server.testing1.svc.k8s.bjo.wdcloud.cc
const webpack = require('webpack');
module.exports = {
  configureWebpack: {
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',

            jQuery: 'jquery',
            'windows.jQuery': 'jquery',
        }),
    ],
},
  devServer: {
    https: false,
    disableHostCheck: true,
    proxy: { 
      '/api': {
        target: 'http://mapi.testing1.wdeduc.com',
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
      },
    }

  }
}