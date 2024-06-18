import { Transform } from "class-transformer";
import { Types } from "mongoose";

export class AddUserDto {
    groupId: string;
    userIds: string[];
}