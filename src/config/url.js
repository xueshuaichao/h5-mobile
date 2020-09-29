const URL = {
    development: {
        API: 'http://mh5.testing1.wdeduc.com/',
    },

    production: {
        API: 'http://mh5.testing1.wdeduc.com',
    },
};

export default URL[process.env.NODE_ENV];