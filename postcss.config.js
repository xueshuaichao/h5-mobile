module.exports = {
    // plugins: {
    //     // 'autoprefixer': {
    //     //     browsers: ['Android >= 4.0', 'iOS >= 7']
    //     // },
    plugins: {
        'postcss-pxtorem': {
            rootValue: 37.5,
            propList: ['*'],
            selectorBlackList: ['van'],
            "exclude": "node_modules"
        },
    }
}