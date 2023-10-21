import { withIronSessionApiRoute } from 'iron-session/next'
import { baseUrl, getPostHeaders } from 'src/api'

export default withIronSessionApiRoute(
  async function loginRoute(req, res) {
    // get user from database then:
    const body = req.body
    const response = await fetch(`${baseUrl}/admin/admin-sign-in`, getPostHeaders(body, 'application/json'))
    const responseData = await response.json()

    req.session.user = responseData
    await req.session.save()

    return res.send(responseData)
  },
  {
    cookieName: 'Authentication',
    password: 'abcd1234abcd1234abcd1234abcd1234',
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    cookieOptions: {
      secure: false
    }
  }
)
