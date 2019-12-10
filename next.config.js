const withLess = require('@zeit/next-less')
const withcss = require('@zeit/next-css')
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer')
const webpack = require('webpack')
const config = require('./config')

if (typeof require !== 'undefined') {
    require.extensions['.css'] = () => { }
}

const { GITHUB_OAUTH_URL } = config
// withLess得到的是一个nextjs的config配置
module.exports = withBundleAnalyzer(withcss({
    // cssModules: true,
    // cssLoaderOptions: {
    //     importLoaders: 1,
    //     localIdentName: "[local]___[hash:base64:5]",
    // }
}))
