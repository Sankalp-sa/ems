import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Todo, todoSchema } from 'src/schemas/Todo.schema';
import { TodosService } from './todo.service';
import { TodosController } from './todos.controller';
import { Note, noteSchema } from 'src/schemas/Note.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Todo.name,
                schema: todoSchema,
            },
            {
                name: Note.name,
                schema: noteSchema
            }
        ]),
        AuthModule
    ],
    providers: [TodosService],
    controllers: [TodosController],
})
export class TodosModule { }
