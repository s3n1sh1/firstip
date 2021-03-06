// Configuration for your app

module.exports = function (ctx) {
  return {
    // app plugins (/src/plugins)
    plugins: [
      'i18n',
      'axios',
      'vuelidate',
      'myplugin'
    ],
    css: [
      'app.styl'
    ],
    extras: [
      ctx.theme.mat ? 'roboto-font' : null,
      'material-icons' // optional, you are not bound to it
      // 'ionicons',
      // 'mdi',
      // 'fontawesome'
    ],
    supportIE: false,
    build: {
      scopeHoisting: true,
      vueRouterMode: 'history',
      // vueCompiler: true,
      // gzip: true,
      // analyze: true,
      // extractCSS: false,
      env: ctx.dev
        ? { // so on dev we'll have
          API: JSON.stringify('http://localhost:8033/api/'),
          // API: JSON.stringify('http://laravel.wexits.com/myiuran/public/index.php/api/'),
          // API: JSON.stringify('http://127.0.0.1:8033/api/'),
          // API: JSON.stringify('http://192.168.42.175:8033/api/'),
          // API: JSON.stringify('http://localhost:8099/firstdb/api/'),
          SECRET: JSON.stringify('eds123')
        }
        : { // and on build (production)
          // API: JSON.stringify('http://192.168.42.175:8033/api/'),
          API: JSON.stringify('http://laravel.wexits.com/myiuran/public/index.php/api/'),
          // API: JSON.stringify('http://localhost:8033/api/'),
          // API: JSON.stringify('http://localhost:8099/firstdb/api/')
          SECRET: JSON.stringify('eds123')
        },
      extendWebpack (cfg) {
        cfg.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /node_modules/
        })
      }
    },
    devServer: {
      // https: true,
      port: 8081,
      open: true // opens browser window automatically
    },
    framework: 'all',
    // framework: {
    //   components: [
    //     'QLayout',
    //     'QLayoutHeader',
    //     'QLayoutDrawer',
    //     'QPageContainer',
    //     'QPage',
    //     'QToolbar',
    //     'QToolbarTitle',
    //     'QBtn',
    //     'QIcon',
    //     'QList',
    //     'QListHeader',
    //     'QItem',
    //     'QItemMain',
    //     'QItemSide',
    //     'QBtnDropdown',
    //     'QItemTile',
    //     'QItemSeparator',
    //     'QModal',
    //     'QModalLayout',
    //     'QField',
    //     'QInput',
    //     'QWindowResizeObservable',
    //     'QTable',
    //     'QTh',
    //     'QTr',
    //     'QTd',
    //     'QTableColumns',
    //     'QSearch',
    //     'QDatetime',
    //     'QCheckbox',
    //     'QCard',
    //     'QCardTitle',
    //     'QCardMain',
    //     'QCardMedia',
    //     'QCardSeparator',
    //     'QCardActions',
    //     'QSpinner',
    //     'QSpinnerAudio',
    //     'QSpinnerBall',
    //     'QSpinnerBars',
    //     'QSpinnerCircles',
    //     'QSpinnerComment',
    //     'QSpinnerCube',
    //     'QSpinnerDots',
    //     'QSpinnerFacebook',
    //     'QSpinnerGears',
    //     'QSpinnerGrid',
    //     'QSpinnerHearts',
    //     'QSpinnerHourglass',
    //     'QSpinnerInfinity',
    //     'QSpinnerIos',
    //     'QSpinnerMat',
    //     'QSpinnerOval',
    //     'QSpinnerPie',
    //     'QSpinnerPuff',
    //     'QSpinnerRadio',
    //     'QSpinnerRings',
    //     'QSpinnerTail',
    //     'QProgress',
    //     'QAjaxBar'
    //   ],
    //   directives: [
    //     'Ripple',
    //     'CloseOverlay'
    //   ],
    //   // Quasar plugins
    //   plugins: [
    //     'Notify',
    //     'Loading',
    //     'LoadingBar',
    //     'Dialog'
    //   ],
    //   config: {
    //     cordova: {
    //       src: 'index.html'
    //     }
    //   }
    //   // iconSet: ctx.theme.mat ? 'material-icons' : 'ionicons'
    //   // i18n: 'de' // Quasar language
    // },
    // animations: 'all' --- includes all animations
    animations: [],
    ssr: {
      pwa: false
    },
    pwa: {
      // workboxPluginMode: 'InjectManifest',
      // workboxOptions: {},
      manifest: {
        // name: 'Quasar App',
        // short_name: 'Quasar-PWA',
        // description: 'Best PWA App in town!',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [
          {
            'src': 'statics/icons/icon-128x128.png',
            'sizes': '128x128',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-192x192.png',
            'sizes': '192x192',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-256x256.png',
            'sizes': '256x256',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-384x384.png',
            'sizes': '384x384',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-512x512.png',
            'sizes': '512x512',
            'type': 'image/png'
          }
        ]
      }
    },
    cordova: {
      // id: 'org.cordova.quasar.app'
    },
    electron: {
      // bundler: 'builder', // or 'packager'
      extendWebpack (cfg) {
        // do something with Electron process Webpack cfg
      },
      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',

        // Window only
        // win32metadata: { ... }
      },
      builder: {
        // https://www.electron.build/configuration/configuration

        // appId: 'quasar-app'
      }
    }
  }
}
