
// http://mz-resource-server.testing1.svc.k8s.bjo.wdcloud.cc
// http://mz-gateway-server.testing1.svc.k8s.bjo.wdcloud.cc
module.exports = {
  devServer: {
    https: false,
    proxy: {
      '/api': {
        target: 'http://mz-gateway-server.testing1.svc.k8s.bjo.wdcloud.cc',
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
      },
      '/resource': {
        target: 'http://mz-resource-server.testing1.svc.k8s.bjo.wdcloud.cc',
        changeOrigin: true,
        pathRewrite: { '^/resource': '' },
      },
    }

  }
}