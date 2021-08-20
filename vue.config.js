require = require('esm')(module);
const allRoutes = require('./src/router')
const routes = allRoutes.default.options.routes
module.exports = {
  devServer:{
    port:9090
  },
  publicPath: '/',
  pluginOptions: {
    sitemap: {
      // baseURL:'http://localhost:8080',
      hashMode: false,
      baseURL: 'http://recwide.com',
      routes,
      outputDir: '/',
    }
  },
  pwa: {
    workboxPluginMode: 'GenerateSW',
    themeColor: '#ff9445',
    workboxOptions: {
      swDest: 'service-worker.js',
      cacheId: 'pwa-sample',
      clientsClaim: true,
      runtimeCaching: [
        {
          urlPattern: new RegExp('^https://connpass\.com/api/v1/event/'),
          handler: 'networkFirst',
          options: {
            cacheName: 'api',
            expiration: {
              maxAgeSeconds: 60 * 60 * 24
            },
            fetchOptions: {
              mode: 'cors',
            },
            matchOptions: {
              ignoreSearch: true,
            },
          }
        }
      ],
      exclude: [/\.map$/, /_redirects/], //this fixed it.

    }
  }
}

