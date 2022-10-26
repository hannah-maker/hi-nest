import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/users.entity';
import { CreateUserDto } from './dtos/create-user-dto';

@Controller('users') /*end point*/
export class UsersController {  
    constructor(private readonly userService: UsersService) { 
       
    }
    @Get()
    getAllUsers(user: User) {
        return this.userService.getUsers(user);
    }

    @Get('/:id')
    getUserById(@Param('id') id:number) : Promise<User> {
        return this.userService.getUserById(id);
    }

    @Post()
    @UsePipes(ValidationPipe) /**Handler level pipes */
    createUser(@Body() createUserDto: CreateUserDto):Promise<User>{
        return this.userService.createUser(createUserDto);
    }

    @Delete('/:id')
    deleteUser(@Param('id', ParseIntPipe) id:number): Promise<void>{
        return this.userService.deleteUser(id);
    }
    /**10.27 update api
     * status 는 고정값이 들어가야 하기 때문에, 예제에서는 enum으로 따로 빼서 관리해주는 것으로 보임. 아직 적용 X
     */
    @Patch('/:id/status')
    updateUserStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body('status') status: string
    ):Promise<User> {
        return this.userService.updateUserSatus(id, status); 
    }
    


    // @Get(':id')
    // getUser(@Param() params) {
    //     return this.userService.getUser(params.id);
    // }

    // @Post()
    // createUser(@Body() user: User) {
    //     return this.userService.createUser(user);
    // }

    // @Post()
    // createUser(@Body() createUserDto: CreateUserDto) {
    //     return this.userService.createUser(CreateUserDto);
    // }

    // @Put()
    // updateUser(@Body() user:User){
    //     return this.userService.updateUser(user);
    // }



    // @Get()
    // async getAllUsers(): Promise<User[]> {
    //     const userList = await this.userService.getUsers();
    //     return Object.assign({
    //       data: userList,
    //       statusCode: 200,
    //       statusMsg: `데이터 조회가 성공적으로 완료되었습니다.`,
    //     });
    //   }


    @Get("search") /*nest js 에서는 해당 serch를 idx 와 동일하게 인지하므로, 최상단으로 끌어올려줘야 한다.*/
    search(@Query('year') searchingYear: string){
        return `We are search user at title : ${searchingYear}`;
    }

    @Get(':id')
    getOneUser(@Param("id") userId: string): string {
        return `This Will Return one movie with the id: ${userId}`;
    }

    @Delete(':id')
    remove(@Param('id') userId: string) {
        return `this will delete a movie: ${userId}`; 
    }

    @Patch(':id')
    patchUser(@Param('id') userId: string, @Body() updateData){
        return {
            updateData: userId,
            ...updateData,
        }
    }
     

}
