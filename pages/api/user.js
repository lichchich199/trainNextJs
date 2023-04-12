// import { withIronSessionApiRoute } from "next-iron-session";
import { withIronSessionApiRoute } from 'iron-session/next'
import { sessionOptions } from "../../lib/session"

//return user and status login
async function userRoute(req, res) {
    if(req.session.user) {
        res.json({
            ...req.session.user,
            isLoggedIn: true
        })
    } else {
        res.json({
            isLoggedIn: false,
        })
    }
}
// set res from userRoute to session with config in sessionOptions
export default withIronSessionApiRoute(userRoute, {
        cookieName: "MYSITECOOKIE",
        cookieOptions: {
          secure: process.env.NODE_ENV === "production" ? true : false
        },
        password: '2gyZ3GDw3LHZQKDhPmPDL3sjREVRXPr8'
      }
    )