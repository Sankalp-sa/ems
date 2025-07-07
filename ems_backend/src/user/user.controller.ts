import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreatUserDto } from './dto/CreateUser.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('register')
  registerUser(@Body() createUserDto: CreatUserDto) {
    // Logic for user registration
    return this.userService.registerUser(createUserDto);
  }

  @Get(':username')
  findUserByUsername(@Param('username') username: string) {
    // Logic for finding a user by username
    return this.userService.findUserByUsername(username);
  }

}
