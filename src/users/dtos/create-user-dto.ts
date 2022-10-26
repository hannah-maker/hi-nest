import { IsNotEmpty } from "class-validator";

export class CreateUserDto {
    @IsNotEmpty() 
    userId: string;
    @IsNotEmpty()
    nickName: string;
    @IsNotEmpty()
    password: string;
    @IsNotEmpty()
    status: string;
}