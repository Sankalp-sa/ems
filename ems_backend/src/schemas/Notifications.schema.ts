import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import {Types} from 'mongoose'

// notification.schema.ts
@Schema()
export class Notification {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  message: string;

  @Prop({ default: false })
  read: boolean;

  @Prop({ default: Date.now })
  createdAt: Date;
}


export const NotificationSchema = SchemaFactory.createForClass(Notification);