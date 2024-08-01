const {i18n} = require('./next-i18next.config')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
})
const withPlugins = require('next-compose-plugins')

const plugins = [[withBundleAnalyzer]]
const serverApiUrl = process.env.BASE_URL + '/SERVICE_API';
const servicePath = process.env.SERVICE_PATH || '/SERVICE_PATH'
const serviceApi = process.env.SERVICE_API || '/SERVICE_API'
const siteId = process.env.SITE_ID || '1'
const port = process.env.PORT || '3000'

const nextConfig = {
    i18n,
    env: {
        SERVER_API_URL: serverApiUrl,
        PORT: port,
        PROXY_HOST: process.env.PROXY_HOST || '/SERVICE_PATH',
        ENV: process.env.ENV || '-',
        SITE_ID: siteId,
        SERVICE_PATH: servicePath,
        SERVICE_API: serviceApi
    },
    serverRuntimeConfig: {
        SERVICE_PATH: servicePath,
        SERVICE_API: serviceApi
    },
    publicRuntimeConfig: {
        SERVICE_PATH: servicePath,
        SERVICE_API: serviceApi
    },
    webpack: (config, {webpack}) => {
        const prod = process.env.NODE_ENV === 'production'
        const newConfig = {
            ...config,
            mode: prod ? 'production' : 'development',
        }
        if (prod) {
            newConfig.devtool = 'hidden-source-map'
        }
        return newConfig
    },
    async rewrites() {
        return [
            {
                source: '/server/:path*',
                destination: `${serverApiUrl}/:path*`,
            },
        ]
    },
    distDir: 'build',
    assetPrefix: '.',
    basePath:'/SERVICE_PATH'
}
module.exports = withPlugins(plugins, nextConfig)
