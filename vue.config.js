
// http://mz-resource-server.testing1.svc.k8s.bjo.wdcloud.cc
// http://mz-gateway-server.testing1.svc.k8s.bjo.wdcloud.cc
module.exports = {
  devServer: {
    https: false,
    proxy: { 
      '/api/resource': {
        target: 'http://mz-resource-server.testing1.svc.k8s.bjo.wdcloud.cc',
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
      },   
      '/api/ucenter': {
        target: 'http://user-center.testing1.svc.k8s.bjo.wdcloud.cc',
        changeOrigin: true,
        pathRewrite: { '^/api/ucenter': '/ucenter' },
      },
      '/api': {
        target: 'http://mz-gateway-server.testing1.svc.k8s.bjo.wdcloud.cc',
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
      },
      '/api/exam': {
        target: 'http://mz-exam-server.testing1.svc.k8s.bjo.wdcloud.cc',
        changeOrigin: true,
        pathRewrite: { '^/api/exam': '/exam' },
      },
    }

  }
}