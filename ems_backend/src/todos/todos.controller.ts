import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { CreateTodoDto } from "./dto/CreateTodo.dto";
import { TodosService } from "./todo.service";
import { UpdateTodoDto } from "./dto/UpdateTodo.dto";
import { JwtGuard } from "src/auth/guards/jwt.guard";
import { RolesGuard } from "src/auth/guards/role.guard";
import { Roles } from "src/auth/decorators/roles.decorator";
import { Request } from "express";

@Controller('todos')
@Roles('admin', 'user')
@UseGuards(RolesGuard)
@UseGuards(JwtGuard)
export class TodosController {

    constructor(private todosService: TodosService) {}

    @Get()
    getTodos(@Req() req: Request) {
        // @ts-ignore
        return this.todosService.getTodos(req.user['id']);
    }

    @Get(':id')
    getTodoById(@Param('id') id: string) {
        // console.log(id);
        return this.todosService.getTodoById(id);
    }

    @Post()
    @UsePipes(new ValidationPipe())
    createTodo(@Body() createTodoDto: CreateTodoDto, @Req() req: Request) {
        return this.todosService.createTodo(createTodoDto, req.user['id']);
    }

    @Put()
    updateTodo(@Body() updateTodoDto: UpdateTodoDto) {
        return this.todosService.updateTodo(updateTodoDto);
    }

    @Delete(':id')
    deleteTodo(@Param('id') id: string) {
        return this.todosService.deleteTodo(id);
    }

}