import { Module } from '@nestjs/common';
import { LeaveService } from './leave.service';
import { LeaveController } from './leave.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Leave, LeaveSchema } from 'src/schemas/Leave.schema';
import { User,userSchema } from 'src/schemas/User.schema';
import { SocketGateway } from 'src/web-socket-gateway/web-socket-gateway';
import { WebSocketGatwayModule } from 'src/web-socket-gateway/web-socket-gateway.module';

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
    ),
    WebSocketGatwayModule
  ],
  controllers: [LeaveController],
  providers: [LeaveService],
})
export class LeaveModule {}
