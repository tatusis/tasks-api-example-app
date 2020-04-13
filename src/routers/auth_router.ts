import { Router } from 'express'
import passport from 'passport'
import httpPassport from 'passport-http'

import { AuthController } from '../controllers/auth_controller'

class AuthRouter {
    public router: Router
    private authController: AuthController
    private passport: passport.Authenticator

    public constructor() {
        this.router = Router()
        this.authController = new AuthController()
        this.passport = new passport.Authenticator()

        this.passport.use(
            new httpPassport.BasicStrategy((username, password, done) => {
                this.authController
                    .authenticate(username, password)
                    .then((result: boolean) => {
                        done(null, result)
                    })
                    .catch(error => {
                        done(error)
                    })
            })
        )

        this.router.use(this.passport.authenticate('basic', { session: false }))
    }
}

export { AuthRouter }
