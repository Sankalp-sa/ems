import { Todo } from "src/schemas/Todo.schema";
import { CreateTodoDto } from "./dto/CreateTodo.dto";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Injectable } from "@nestjs/common";
import { Note } from "src/schemas/Note.schema";
import { UpdateTodoDto } from "./dto/UpdateTodo.dto";

@Injectable()
export class TodosService {

    constructor(@InjectModel(Todo.name) private todoModel: Model<Todo>,
        @InjectModel(Note.name) private noteModel: Model<Note>) { }

    async createTodo({ instructions, ...createTodoDto }: CreateTodoDto, userId: string) {

        const createdNotes = await Promise.all(
            instructions.map(note => new this.noteModel(note).save())
        );

        console.log('Created Notes:', createdNotes);

        // Collect their IDs
        const noteIds = createdNotes.map(note => note._id);

        console.log('Note IDs:', noteIds);
 
        // Create and save the Todo with instructions
        const createdTodo = new this.todoModel({
            ...createTodoDto,
            instructions: noteIds,
            userId: userId 
        });

        return createdTodo.save();

    }

    async updateTodo(updateTodoDto: UpdateTodoDto) {
        const { instructions, ...rest } = updateTodoDto;

        const todo = await this.todoModel.findById(updateTodoDto.id);
        if (!todo) {
            throw new Error('Todo not found');
        }

        if (rest.title !== undefined) todo.title = rest.title;
        if (rest.description !== undefined) todo.description = rest.description;


        if (instructions && instructions.length > 0) {

            const createdNotes = await Promise.all(
                instructions.map(note => new this.noteModel(note).save())
            );
            // const noteIds = createdNotes.map(note => note._id);
            todo.instructions = createdNotes;
        }

        return todo.save();
    }

    async getTodos(id: string) {
        const todos = await this.todoModel.find({ userId: id }).populate('instructions');
        return todos;
    }

    async getTodoById(id: string) {
        return this.todoModel.findById(id).populate('instructions');
    }

    async deleteTodo(id: string) {
        const todo = await this.todoModel.findByIdAndDelete(id);
        if (!todo) {
            throw new Error('Todo not found');
        }
        return todo;
    }

}