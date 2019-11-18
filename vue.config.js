const path = require('path')
const PrerenderSPAPlugin = require('prerender-spa-plugin')

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        // Inject sass abstract data so they will be available in all Vue compomnents
        data: `
          @import "@/sass/abstract/index.scss";
        `
      }
    }
  },

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false
    },
    webpackBundleAnalyzer: {
      analyzerMode: 'static',
      openAnalyzer: false
    }
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.plugins.push(
        new PrerenderSPAPlugin({
          staticDir: path.join(__dirname, 'dist'),
          routes: ['/', '/about', '/skills', '/works', '/contact']
        })
      )
    }
  }
}
