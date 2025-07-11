import { Module } from '@nestjs/common';
import { LeaveService } from './leave.service';
import { LeaveController } from './leave.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Leave, LeaveSchema } from 'src/schemas/Leave.schema';
import { User,userSchema } from 'src/schemas/User.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: Leave.name,
          schema: LeaveSchema
        },
        {
          name: User.name,
          schema: userSchema
        }
      ]
    )
  ],
  controllers: [LeaveController],
  providers: [LeaveService],
})
export class LeaveModule {}
