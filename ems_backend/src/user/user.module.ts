import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from 'src/schemas/User.schema';

@Module({
  imports: [
          MongooseModule.forFeature([
              {
                  name: User.name,
                  schema: userSchema,
              },
        
          ])
      ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
