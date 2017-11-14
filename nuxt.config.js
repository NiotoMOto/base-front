const bodyParser = require('body-parser')
const nodeExternals = require('webpack-node-externals')
const session = require('express-session')
const config = require('./config/')
const WebfontPlugin = require('webpack-webfont').default
const path = require('path')

module.exports = {
  /*
  ** Headers of the page
  */
  dev: process.env.NODE_ENV !== 'production',
  head: {
    title: 'annbouje',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Ann bouje !' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  css: [
    '@/assets/css/main.scss',
    '@/assets/stylus/app.styl'
  ],

  modules: [
    [
      '@nuxtjs/axios',
      {
        requestInterceptor: (config, { store }) => {
          if (store.state.token && store.state.user) {
            config.headers['Authorization'] = `Bearer ${store.state.user.token}`
            config.withCredentials = true
          }
          return config
        },
        baseURL: config.apiUrl,
        browserBaseURL: config.browserApiUrl
      }
    ]
  ],
  router: {
    middleware: 'i18n'
  },
  build: {
    babel: {
      plugins: [
        ['transform-imports', {
          'vuetify': {
            'transform': 'vuetify/es5/components/${member}',
            'preventFullImport': true
          }
        }]
      ]
    },
    /*
    ** Run ESLint on save
    */
    extend (config, ctx) {
      if (ctx.dev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
      if (ctx.isServer) {
        config.externals = [
          nodeExternals({
            whitelist: [/^vuetify/]
          })
        ]
      }
      config.module.rules.forEach(rule => {
        if (rule.test.toString() === '/\\.styl(us)?$/') {
          rule.use.push({
            loader: 'vuetify-loader',
            options: {
              theme: path.resolve('./assets/stylus/theme.styl')
            }
          })
        }
      })
    },
    plugins: [
      new WebfontPlugin({
        files: path.resolve(__dirname, './fixtures/svg-icons/**/*.svg'),
        css: true,
        template: 'scss',
        fontName: 'cs-font',
        cssTemplateFontPath: '~/assets/css/fonts/',
        dest: {
          fontsDir: path.resolve(__dirname, './assets/css/fonts'),
          stylesDir: path.resolve(__dirname, './assets/css/fonts')
        }
      })
    ],
    vendor: ['axios', 'vue-i18n', '~/plugins/vuetify.js']
  },
  serverMiddleware: [
    // body-parser middleware
    bodyParser.json(),
    // session middleware
    session({
      secret: 'super-secret-key',
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 60000 }
    }),
    // Api middleware
    // We add /api/login & /api/logout routes
    '~/api'
  ],
  plugins: ['~/plugins/i18n.js', '~/plugins/vuetify'],
  extractCSS: true,
  generate: {
    routes: [
      '/', '/login', '/register', '/annonces/create',
      '/fr', '/fr/login', '/fr/register', '/fr/annonces/create'
    ]
  }
}
