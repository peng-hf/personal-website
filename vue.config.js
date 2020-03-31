const path = require('path')
const PrerenderSPAPlugin = require('prerender-spa-plugin')
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        // Inject sass abstract data so they will be available in all Vue compomnents
        prependData: `
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
          routes: ['/', '/about', '/skills', '/works', '/contact'],
          renderer: new Renderer({
            headless: false,
            defaultViewport: {
              width: 1920,
              height: 1080
            }
          }),
          postProcess(renderedRoute) {
            // Allow Vue hydratation for SSR by injecting server-rendered="true"
            // on the mounted rendered root
            renderedRoute.html = renderedRoute.html.replace(
              'id="root-rendered"',
              'id="root" data-server-rendered="true"'
            )
            return renderedRoute
          }
        })
      )
    }
  }
}
