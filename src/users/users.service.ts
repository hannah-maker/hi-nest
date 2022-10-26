import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNumberOptions } from 'class-validator';
import { errorMonitor } from 'events';
import { Repository } from 'typeorm';
import { BroadcasterResult } from 'typeorm/subscriber/BroadcasterResult';
import { CreateUserDto } from './dtos/create-user-dto';
import { User } from './entities/users.entity'
import { UserRepository } from './users.repository';

@Injectable() // 다른 컴포넌트에서 해당 서비스를 사용할 수 있도록 주입. nest js 어디에서든 사용할 수 있게 됨. 
export class UsersService {
    constructor(
        @InjectRepository(UserRepository) private usersRepository:UserRepository) { 
            
        }

    async getUsers(user: User): Promise<User[]> {
        try{
            return await this.usersRepository.find();
        }
        catch(error){
            throw error;
        }

    }
    //async await 를 사ㅇ해서 데터이스 작성이 끝난 후  결과값을 받을 수 있게 
    async getUserById(id: number): Promise <User>{
        const found = await this.usersRepository.findOne({id}); //typeorm 2 로 down grade 했더니 id에 빨간 줄이 그어지는 에러 해결

        if(!found) {
            throw new NotFoundException(`Can't find Board with id ${id}`);
        }
        return found;
    }

    // async getUser(_id: number): Promise<User[]> {
    //     try{
    //         return await this.usersRepository.find({
    //             select: ["userId", "nickName", "status"],
    //             where: [{ "id": _id }]
    //         })
    //     }
    //     catch(error){
    //         throw error;
    //     }
    // }

    createUser(createUserDto: CreateUserDto) : Promise<User>{
        return this.usersRepository.createUser(createUserDto); 
    }

   async deleteUser(id: number): Promise<void>{
        const result = await this.usersRepository.delete({id});
        if(result.affected === 1){
            console.log(`${id}`);
        }
        
        if(result.affected === 0){
            throw new NotFoundException(`Can not find Board user id ${id}`);
        }
   }

    async updateUserSatus(id: number, status: string): Promise<User>{
        const user = await this.getUserById(id);
        user.status = status;
        await this.usersRepository.save(user);
        return user;
    }


    // async findById(id: number): Promise<User[]> {
    //     try {
    //       const user = await this.usersRepository.findOneOrFail({ id });
    //       return {
    //         ok: true,
    //         user,
    //       };
    //     } catch (error) {
    //       return { ok: false, error: 'User Not Found' };
    //     }
    //   }
}
