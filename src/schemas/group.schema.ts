import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { User } from "./user.schema";
import { Expense } from "./expense.schema";

@Schema()
export class Group {
    @Prop({ type: Types.ObjectId, default: () => new Types.ObjectId() })
    _id: string;

    @Prop()
    name: string;

    @Prop()
    creator: string;

    @Prop()
    users: string[];
}

export const GroupSchema = SchemaFactory.createForClass(Group);

export type GroupDocument = HydratedDocument<Group>;