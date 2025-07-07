import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalGuard } from './guards/local.guard';
import { JwtGuard } from './guards/jwt.guard';
import { RolesGuard } from './guards/role.guard';
import { Roles } from './decorators/roles.decorator';
import { Role } from './enums/role.enum';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalGuard)
  login(@Res({passthrough: true}) res: Response, @Req() req: Request){

    // console.log(res.cookie);

    res.cookie('user_token', req.user, {
      httpOnly: true,
      secure:true
    });

    console.log(req.cookies);
    return {token:req.user};
  }

  @Get('status')
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @UseGuards(JwtGuard)
  status(@Req() req: Request) {
    return req.user
  }

}
