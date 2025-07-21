import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, UsePipes, ValidationPipe } from '@nestjs/common';
import { LeaveService } from './leave.service';
import { CreateLeaveDto } from './dto/create-leave.dto';
import { UpdateLeaveDto } from './dto/update-leave.dto';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/enums/role.enum';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import {Request} from 'express'

@Roles(Role.Admin,Role.User,Role.Manager)
@UseGuards(RolesGuard)
@UseGuards(JwtGuard)
@UsePipes(new ValidationPipe())
@Controller('leave')
export class LeaveController {
  constructor(private readonly leaveService: LeaveService) {}

  @Post()
  async create(@Body() createLeaveDto: CreateLeaveDto,@Req() req: Request) {

    
    return this.leaveService.createLeave(createLeaveDto, req.user['id'] );
  }

  

  @Get('myleave')
  findLeaves(@Req() req: Request) {
    return this.leaveService.findLeaves(req.user['id']);

  }


  @Patch('update/:id')
  async updateLeave(@Param('id') leaveId:string ,@Body() updateLeaveDto: UpdateLeaveDto) {

    return await this.leaveService.updateLeave( leaveId, updateLeaveDto);
  }


  
  @Delete('delete')
  async remove(@Req() req: Request) {
    return await this.leaveService.removeLeave(req.user['id']);
  }

  @Roles(Role.Admin,Role.Manager)
  @Get('employeeLeaves')
  async getEmployeeLeaves(@Req() req: Request)
  {
    return await this.leaveService.getEmployeeLeaves(req.user['id']);
  }


  @Roles(Role.Admin,Role.Manager)
  @Patch('manageLeave')
  async updateLeaveStatus( @Req() req: Request,
    @Body('status') status: 'approved' | 'rejected',)
  {
    const leaveId = req.body.leaveId;
    
    console.log(leaveId)
    return await this.leaveService.updateLeaveStatus(leaveId, status)
  }

  @Get(':id')
  async getLeaveById(@Param('id') id:string)
  {
    return this.leaveService.getLeaveById(id)
  }

}
