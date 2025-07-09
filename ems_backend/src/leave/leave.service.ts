import { Injectable } from '@nestjs/common';
import { Leave } from '../schemas/Leave.schema'
import {Model} from 'mongoose'
import { CreateLeaveDto } from './dto/create-leave.dto';
import { UpdateLeaveDto } from './dto/update-leave.dto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class LeaveService {

  constructor(@InjectModel(Leave.name) private leaveModel: Model<Leave>){}

  async createLeave(createLeaveDto: CreateLeaveDto, userId: string) {
     const createdLeave = new this.leaveModel(
      {
        ...createLeaveDto,
        userId: userId
      }
     )
     return createdLeave.save()
  }

  
  async findLeaves(UserId: string) {

    console.log(UserId);
    return await this.leaveModel.find( {userId:UserId});
  }

  async updateLeave(UserId: string, updateLeaveDto: UpdateLeaveDto) {

    return this.leaveModel.findOneAndUpdate({userId:UserId},updateLeaveDto)
    
  }

  async removeLeave(UserId: string) {
    return this.leaveModel.findOneAndDelete({userId:UserId})
  }

}
