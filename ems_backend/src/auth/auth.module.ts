import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtGuard } from './guards/jwt.guard';
import { LocalGuard } from './guards/local.guard';
import { WebSocketGatwayModule } from 'src/web-socket-gateway/web-socket-gateway.module';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      secret: configService.get<string>('JWT_SECRET'),
      signOptions: { expiresIn: '1h' }, // Token expiration time
      
    }),
  }), UserModule, WebSocketGatwayModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy, JwtGuard, LocalGuard],
  exports: [LocalGuard, JwtGuard]
})
export class AuthModule {}
