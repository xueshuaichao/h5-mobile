
module.exports = {
  devServer: {
    https: false,
    proxy: {
      '/api': {
        target: 'http://learn-center-server.testing1.svc.k8s.bjo.wdcloud.cc',
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
      }
    }

  }
}