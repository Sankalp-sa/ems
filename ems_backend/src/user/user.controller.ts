import { Body, ConsoleLogger, Controller, Get, Param, Post } from '@nestjs/common';
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

  @Get('managers')
  findManagers() {
    return this.userService.findManagers();
  }

  @Get(':username')
  findUserByUsername(@Param('username') username: string) {
    return this.userService.findUserByUsername(username);
  }

}
