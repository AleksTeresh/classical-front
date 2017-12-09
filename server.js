'use strict'

const config = require('./lib/config-reader')()
const proxy = require('./lib/proxy')(config)
const server = require('./lib/server')(config, proxy)
const { port, sslPort, redirectHttp, ssl } = config

server.listen(ssl ? sslPort : port, () => {
  console.log('Express proxy listens at ' + (ssl ? sslPort : port))
})

// if redirecting http to https is set to true
if (ssl && redirectHttp) {
  const httpRedirectServer = require('./lib/server')(
    {
      ...config,
      ssl: false
    },
    proxy,
    true
  )

  httpRedirectServer.listen(port, () => {
    console.log('http requests to port ' + port +
        ' will be redirected to https port ' + sslPort)
  })
}
