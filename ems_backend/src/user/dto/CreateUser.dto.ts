import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreatUserDto {

    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsOptional()
    @IsString()
    role: string;

}