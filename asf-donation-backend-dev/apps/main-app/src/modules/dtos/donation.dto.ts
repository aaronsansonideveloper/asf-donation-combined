import {IsEmail, IsNumber, IsOptional, IsString, IsStrongPassword} from "class-validator";

export class DonationDTO {
    @IsString()
    first_name: string;

    @IsString()
    last_name: string;

    @IsEmail()
    email: string;

    @IsNumber()
    group_id: number;
}