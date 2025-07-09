import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";

@Schema()
export class User {

    @Prop({ required: true, unique: true })
    username: string;

    @Prop({ required: true , unique: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({default: 'User'})
    role: string;

    @Prop({ type: Types.ObjectId, ref: 'Employee' })
    manager: Types.ObjectId;
} 

export const userSchema = SchemaFactory.createForClass(User);