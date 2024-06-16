import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

@Schema()
export class Group {
    @Prop()
    name: string;

    @Prop({type: Types.ObjectId, ref: 'User'})
    creator: string;

    @Prop({type: [Types.ObjectId], ref: 'User'})
    users: string[];

    @Prop({type: [Types.ObjectId], ref: 'Expense', default: []})
    expenses: string[];
}

export const GroupSchema = SchemaFactory.createForClass(Group);

export type GroupDocument = HydratedDocument<Group>;