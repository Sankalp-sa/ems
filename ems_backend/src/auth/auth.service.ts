import { Injectable } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { findSourceMap } from 'module';

@Injectable()
export class AuthService {

  constructor(private userService: UserService, private jwtService: JwtService) { }

  async validateUser({ username, password }: AuthPayloadDto) {

    const findUser = await this.userService.findUserByUsername(username);

    if (!findUser) {
      return null;
    }

    if (findUser.password !== password) {
      return null;
    }

    const user = {
      id: findUser._id,
      username,
      role: findUser.role,
    }

    return this.jwtService.sign(user);

  }
}
