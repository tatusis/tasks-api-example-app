import { AuthDao } from '../dao/auth_dao'

class AuthController {
    private authDao: AuthDao

    public constructor() {
        this.authDao = new AuthDao()
    }

    public async authenticate(
        username: string,
        password: string
    ): Promise<boolean> {
        const user = await this.authDao.findUserByUsername(username)

        if (user.username == username && user.password == password) {
            return true
        } else {
            return false
        }
    }
}

export { AuthController }
