import { withIronSessionApiRoute } from "iron-session/next"

function logoutRoute(req, res) {
    req.session.destroy();
    res.json({
        isLoggedIn: false,
        email: '',
        password: ''
    })
}

export default withIronSessionApiRoute(logoutRoute, {
    cookieName: "MYSITECOOKIE",
    cookieOptions: {
      secure: process.env.NODE_ENV === "production" ? true : false
    },
    password: '2gyZ3GDw3LHZQKDhPmPDL3sjREVRXPr8'
  })