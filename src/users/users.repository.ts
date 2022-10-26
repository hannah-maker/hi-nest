import { EntityRepository, Repository } from "typeorm";
import { User } from "./entities/users.entity";
import { CreateUserDto } from "./dtos/create-user-dto";


@EntityRepository(User)
export class UserRepository extends Repository<User> {

    async createUser(createUserDto: CreateUserDto) : Promise<User> {
        const {userId, nickName, password} = createUserDto;

        const user = this.create({ 
            userId, 
            nickName,
            password
        })

        await this.save(user);
        return user;
    }
}