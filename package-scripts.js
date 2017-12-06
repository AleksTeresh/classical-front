const {series, crossEnv, concurrent, rimraf} = require('nps-utils')
const {config: {port: E2E_PORT}} = require('./test/protractor.conf')

module.exports = {
  scripts: {
    default: 'nps webpack',
    cubx: {
      default: 'cubx-http-server ./build -c-1 --proxy=http://localhost:8080'
    },
    test: {
      default: 'nps test.jest',
      jest: {
        default: series(
          rimraf('test/coverage-jest'),
          crossEnv('BABEL_TARGET=node jest')
        ),
        accept: crossEnv('BABEL_TARGET=node jest -u'),
        watch: crossEnv('BABEL_TARGET=node jest --watch')
      },

      lint: {
        default: 'eslint src',
        fix: 'eslint --fix'
      },
      all: concurrent({
        jest: 'nps test.jest',
        lint: 'nps test.lint'
      })
    },
    e2e: {
      default: concurrent({
        webpack: `webpack-dev-server --inline --port=${E2E_PORT}`,
        protractor: 'nps e2e.whenReady'
      }) + ' --kill-others --success first',
      protractor: {
        install: 'webdriver-manager update',
        default: series(
          'nps e2e.protractor.install',
          'protractor test/protractor.conf.js'
        ),
        debug: series(
          'nps e2e.protractor.install',
          'protractor test/protractor.conf.js --elementExplorer'
        )
      },
      whenReady: series(
        `wait-on --timeout 120000 http-get://localhost:${E2E_PORT}/index.html`,
        'nps e2e.protractor'
      )
    },
    build: 'nps webpack.build',
    webpack: {
      default: 'nps webpack.server',
      build: {
        before: rimraf('public'),
        default: 'nps webpack.build.production',
        development: {
          default: series(
            'nps webpack.build.before',
            'webpack --progress -d'
          ),
          extractCss: series(
            'nps webpack.build.before',
            'webpack --progress -d --env.extractCss'
          ),
          serve: series.nps(
            'webpack.build.development',
            'serve'
          )
        },
        production: {
          inlineCss: series(
            'nps webpack.build.before',
            crossEnv('NODE_ENV=production webpack --progress -p --env.production')
          ),
          default: series(
            'nps webpack.build.before',
            crossEnv('NODE_ENV=production webpack --progress -p --env.production --env.extractCss')
          ),
          serve: series.nps(
            'webpack.build.production',
            'serve'
          )
        }
      },
      server: {
        default: `webpack-dev-server -d --devtool '#source-map' --inline --env.server`,
        extractCss: `webpack-dev-server -d --devtool '#source-map' --inline --env.server --env.extractCss`,
        hmr: `webpack-dev-server -d --devtool '#source-map' --inline --hot --env.server`
      }
    },
    serve: 'http-server public --cors'
  }
}
