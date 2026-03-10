import { app } from './server.js'

describe('GET /', () => {
  afterAll(async () => {
    await app.close()
  })

  it('should return hello message', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/'
    })

    expect(response.statusCode).toBe(200)
    expect(response.body).toBe('hello 👋🏻')
  })
})
