import { getRepository, Repository } from 'typeorm'

import { User } from '../entities/user'

class AuthDao {
    private repository: Repository<User>

    public constructor() {
        this.repository = getRepository(User)
    }

    public findUserByUsername(username: string): Promise<User> {
        return this.repository.findOneOrFail({
            where: [{ username: username }]
        })
    }
}

export { AuthDao }
