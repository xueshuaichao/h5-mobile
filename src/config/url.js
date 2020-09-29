const URL = {
    development: {
        API: 'http://mz-exam-server.testing1.svc.k8s.bjo.wdcloud.cc',
    },

    production: {
        API: 'http://mz-exam-server.testing1.svc.k8s.bjo.wdcloud.cc',
    },
};

export default URL[process.env.NODE_ENV];
