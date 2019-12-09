const withCss = require('@zeit/next-css')
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer')
const webpack = require('webpack')
const config = require('./config')

if (typeof require !== 'undefined') {
    require.extensions['.css'] = () => { }
}

const { GITHUB_OAUTH_URL } = config
// withCss得到的是一个nextjs的config配置
module.exports = withBundleAnalyzer(withCss({}))
