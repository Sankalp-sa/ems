import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import {Types} from 'mongoose'

import { User } from './User.schema'

@Schema({timestamps: true})
export class Leave {

    @Prop({type: Types.ObjectId ,ref:'User', required: true})
    userId: User

    @Prop({required: true})
    startDate: Date;

    @Prop({required: true})
    endDate: Date;

    @Prop({required: true})
    reason: string;

    @Prop({ enum : ['pending','approved','rejected'], default: 'pending'})
    status: 'pending' | 'approved' | 'rejected'
    

}

export const LeaveSchema = SchemaFactory.createForClass(Leave)