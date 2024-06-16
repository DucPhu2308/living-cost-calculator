import { IsNotEmpty } from "class-validator";

export class CreateGroupDto {
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    creator: string;
    @IsNotEmpty()
    users: string[];
}