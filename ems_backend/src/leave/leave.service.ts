import { Injectable } from '@nestjs/common';
import { Leave } from '../schemas/Leave.schema'
import { User } from '../schemas/User.schema'
import {Model} from 'mongoose'
import { CreateLeaveDto } from './dto/create-leave.dto';
import { UpdateLeaveDto } from './dto/update-leave.dto';
import { InjectModel } from '@nestjs/mongoose';
import { SocketGateway } from 'src/web-socket-gateway/web-socket-gateway';


@Injectable()
export class LeaveService {

  constructor(@InjectModel(Leave.name) private leaveModel: Model<Leave>,
              @InjectModel(User.name) private userModel: Model<User>,
              @InjectModel(Notification.name) private notificationModel: Model<Notification>,
              private SocketGateway: SocketGateway){}

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

  async updateLeave(leaveId: string, updateLeaveDto: UpdateLeaveDto) {

    return this.leaveModel.findOneAndUpdate({_id:leaveId},updateLeaveDto,{ new: true })
    
  }

  async removeLeave(UserId: string) {
    return this.leaveModel.findOneAndDelete({userId:UserId})
  }


   async updateLeaveStatus(leaveId: string, status: 'approved' | 'rejected') {
    
    const leave = await this.leaveModel.findByIdAndUpdate(leaveId, { status: status });
    await leave.save();
    const targetUserId = leave.userId.toString()

    await this.notificationModel.create({
      userId: targetUserId,
      message: `Your leave was ${status}`,
    });

    this.SocketGateway.sendLeaveStatusUpdate(
      leave.userId.toString(),
      {
        leaveId,
        status,
        message: `Your leave was ${status}`,
      }
    );

    return leave;

  }

  async getEmployeeLeaves(managerId: string)
  {
    const Users = await this.userModel.find({ manager: managerId }).select('_id');
    const UserIds = Users.map(user => user._id.toString())
    console.log(UserIds)
    return this.leaveModel.find({ userId: { $in: UserIds } });

  }

  async getLeaveById(LeaveId:string)

  {
    const leave = await this.leaveModel.findById(LeaveId);
    return leave;
  }


}import { Notification } from 'src/schemas/Notifications.schema';

