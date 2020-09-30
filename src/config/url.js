const URL = {
    development: {
        API: '/api',
    },
    test: {
        API: 'http://mapi.testing1.wdeduc.com',
    },
    production: {
        API: 'http://mapi.testing1.wdeduc.com',
    },
};

export default URL[process.env.NODE_ENV];
