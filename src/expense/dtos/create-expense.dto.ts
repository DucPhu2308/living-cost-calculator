import { Transform } from "class-transformer";
import { Types } from "mongoose";

export class CreateExpenseDto {
    readonly name: string;
    readonly cost: number;

    // use transform decorator to convert string to ObjectId
    @Transform(({ value }) => new Types.ObjectId(value))
    readonly creator: Types.ObjectId;

    @Transform(({ value }) => new Types.ObjectId(value))
    readonly group: string;

    @Transform(({ value }) => value.map((v: string) => new Types.ObjectId(v)))
    readonly shared_with: Types.ObjectId[];
}