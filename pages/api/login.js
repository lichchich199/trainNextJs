// import { withIronSession } from "next-iron-session";
import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from '../../lib/session';


async function loginRoute(req, res) {
    const { email, password } = req.body;
    try {
        const user = {
            isLoggedIn: true,
            email,
            password
        }
        req.session.user = user;
        await req.session.save()
        res.json(user)
    } catch (error) {
        res.status(500).json({message : error.message})
    }
}

// set res from loginRoute to session with config in sessionOptions
export default withIronSessionApiRoute(loginRoute, {
    cookieName: "MYSITECOOKIE",
    cookieOptions: {
      secure: process.env.NODE_ENV === "production" ? true : false
    },
    password: '2gyZ3GDw3LHZQKDhPmPDL3sjREVRXPr8'
  })