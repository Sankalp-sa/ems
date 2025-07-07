import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

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
} 

export const userSchema = SchemaFactory.createForClass(User);