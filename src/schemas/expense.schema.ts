import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { User } from "./user.schema";
import { Group } from "./group.schema";

@Schema()
export class Expense {
    @Prop({ type: Types.ObjectId, default: () => new Types.ObjectId() })
    _id: string;

    @Prop()
    name: string;

    @Prop()
    cost: number;

    @Prop({ type: Types.ObjectId, ref: 'User'})
    creator: string;

    @Prop([{ type: Types.ObjectId, ref: 'User' }])
    shared_with: string[];

    @Prop({ type: Types.ObjectId, ref: 'Group'})
    group: string;

    @Prop()
    created_date: Date;

    @Prop()
    done_date: Date;
}

export const ExpenseSchema = SchemaFactory.createForClass(Expense);

export type ExpenseDocument = HydratedDocument<Expense>;