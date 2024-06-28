import { Transform } from "class-transformer";
import { Types } from "mongoose";

export class AddUserToExpenseDto {
    readonly expenseId: string;
    @Transform(({ value }) => value.map((v: string) => new Types.ObjectId(v)))
    readonly userIds: string[];
}