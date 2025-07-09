import { PartialType } from '@nestjs/mapped-types';
import { CreateLeaveDto } from './create-leave.dto';
import { IsNotEmpty, IsDateString, IsString } from "class-validator";

export class UpdateLeaveDto extends PartialType(CreateLeaveDto) {

   
    @IsDateString()
    startDate: Date;    
    
    @IsDateString()
    endDate: Date;  

    @IsString()
    reason: String;
    
}
