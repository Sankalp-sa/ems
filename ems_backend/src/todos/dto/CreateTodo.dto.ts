import {IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Note } from "src/schemas/Note.schema";

export class CreateTodoDto {

    @IsNotEmpty()
    @IsString()
    title: string;
    
    @IsNotEmpty()
    @IsString()
    description: string;

    @IsOptional()
    instructions: Note[];
     
}
