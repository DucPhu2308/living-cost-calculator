import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

@Schema()
export class Expense {
    @Prop()
    name: string;

    @Prop()
    cost: number;

    @Prop({type: Types.ObjectId, ref: 'User'})
    creator: string;

    @Prop({type: Types.ObjectId, ref: 'Group'})
    group: string;

    @Prop()
    created_date: Date;

    @Prop()
    deleted_date: Date;

    @Prop()
    done_date: Date;
}

export const ExpenseSchema = SchemaFactory.createForClass(Expense);

export type ExpenseDocument = HydratedDocument<Expense>;