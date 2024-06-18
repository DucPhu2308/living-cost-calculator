import { Transform } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { Types } from "mongoose";

export class CreateGroupDto {
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    @Transform(({ value }) => new Types.ObjectId(value))
    creator: Types.ObjectId;
    @IsNotEmpty()
    @Transform(({ value }) => value.map(id => new Types.ObjectId(id)))
    users: Types.ObjectId[];
}