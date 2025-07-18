import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './auth/guards/role.guard';
import { LeaveModule } from './leave/leave.module';
import { WebSocketGatwayModule } from './web-socket-gateway/web-socket-gateway.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }), MongooseModule.forRoot(process.env.DB_URI, {
    dbName: process.env.DB_NAME,
  }), AuthModule, UserModule, LeaveModule, WebSocketGatwayModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
