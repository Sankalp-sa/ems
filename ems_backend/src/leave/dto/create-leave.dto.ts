import { IsNotEmpty, IsDateString, IsString } from "class-validator";

export class CreateLeaveDto {

    @IsNotEmpty()
    @IsDateString()
    startDate: Date;

    @IsNotEmpty()
    @IsDateString()
    endDate: Date;

    @IsNotEmpty()
    @IsString()
    reason: String;



}
