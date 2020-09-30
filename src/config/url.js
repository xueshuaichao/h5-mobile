const URL = {
    development: {
        API: '/api',
    },
    test: {
        API: '/api',
    },
    production: {
        API: '/api',
    },
};

export default URL[process.env.NODE_ENV];
