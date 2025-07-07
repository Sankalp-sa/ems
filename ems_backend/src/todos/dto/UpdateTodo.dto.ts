// src/todos/dto/UpdateTodo.dto.ts
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Note } from 'src/schemas/Note.schema';

export class UpdateTodoDto {

    @IsNotEmpty()
    @IsString()
    id: string;

    @IsOptional()
    title?: string;

    @IsOptional()
    description?: string;
    
    @IsOptional()
    instructions?: Note[]; 
}