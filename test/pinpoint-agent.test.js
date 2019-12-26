'use strict'

const mock = require('egg-mock')

describe('test/pinpoint-agent.test.js', () => {
  let app
  before(() => {
    app = mock.app({
      baseDir: 'apps/pinpoint-agent-test',
    })
    return app.ready()
  })

  after(() => app.close())
  afterEach(mock.restore)

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, pinpointAgent')
      .expect(200)
  })
})
