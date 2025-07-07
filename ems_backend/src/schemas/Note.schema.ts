import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Note {
    @Prop({ required: true })
    note: string;
}

export const noteSchema = SchemaFactory.createForClass(Note);