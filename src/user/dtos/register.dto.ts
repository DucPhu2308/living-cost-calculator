import { IsEmail, IsNotEmpty, Matches, Validate } from "class-validator";

export class RegisterDto {
    @IsEmail()
    email: string;
    @IsNotEmpty()
    @Matches(/^[a-zA-Z0-9]{6,20}$/, { message: 'Username must be between 6 and 20 characters, no special characters' })
    username: string;
    @IsNotEmpty()
    password: string;
}