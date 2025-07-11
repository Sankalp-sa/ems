import { Injectable } from '@nestjs/common';
import { Leave } from '../schemas/Leave.schema'
import { User } from '../schemas/User.schema'
import {Model} from 'mongoose'
import { CreateLeaveDto } from './dto/create-leave.dto';
import { UpdateLeaveDto } from './dto/update-leave.dto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class LeaveService {

  constructor(@InjectModel(Leave.name) private leaveModel: Model<Leave>,
              @InjectModel(User.name) private userModel: Model<User>){}

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


   async updateLeaveStatus(leaveId: string, status: 'approved' | 'rejected') {
    
    const leave = await this.leaveModel.findByIdAndUpdate(leaveId, { status: status });
    return leave.save();
  }

  async getEmployeeLeaves(managerId: string)
  {
    const Users = await this.userModel.find({ manager: managerId }).select('_id');
    const UserIds = Users.map(user => user._id.toString())
    console.log(UserIds)
    return this.leaveModel.find({ userId: { $in: UserIds } });

  }



}
