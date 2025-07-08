import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { LeaveService } from './leave.service';
import { CreateLeaveDto } from './dto/create-leave.dto';
import { UpdateLeaveDto } from './dto/update-leave.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import {Request} from 'express'

@Controller('leave')
export class LeaveController {
  constructor(private readonly leaveService: LeaveService) {}

  @Post()
  @Roles(Role.Admin,Role.User)
  @UseGuards(RolesGuard)
  @UseGuards(JwtGuard)
  create(@Body() createLeaveDto: CreateLeaveDto,@Req() req: Request) {

    
    return this.leaveService.createLeave(createLeaveDto, req.user['id'] );
  }

  // @Get()
  // findAll() {
  //   return this.leaveService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.leaveService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateLeaveDto: UpdateLeaveDto) {
  //   return this.leaveService.update(+id, updateLeaveDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.leaveService.remove(+id);
  // }
}
