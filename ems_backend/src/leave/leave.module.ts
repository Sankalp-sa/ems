import { Module } from '@nestjs/common';
import { LeaveService } from './leave.service';
import { LeaveController } from './leave.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Leave, LeaveSchema } from 'src/schemas/Leave.schema';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: Leave.name,
          schema: LeaveSchema
        }
      ]
    )
  ],
  controllers: [LeaveController],
  providers: [LeaveService],
})
export class LeaveModule {}
