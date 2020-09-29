
// http://mz-resource-server.testing1.svc.k8s.bjo.wdcloud.cc
// http://mz-gateway-server.testing1.svc.k8s.bjo.wdcloud.cc
module.exports = {
  devServer: {
    https: false,
    proxy: { 
      '/api': {
        target: 'http://mapi.testing1.wdeduc.com',
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
      },
    }

  }
}