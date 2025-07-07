import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { ObjectId } from "mongoose";
import { Note } from "./Note.schema";
import { User } from "./User.schema";

@Schema()
export class Todo {

    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    description: string;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Note' }] })
    instructions: Note[];

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    userId: User;

}

export const todoSchema = SchemaFactory.createForClass(Todo);