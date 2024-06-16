import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";


@Schema()
export class User {
    @Prop({ unique: true})
    email: string;
    @Prop()
    password: string;
    @Prop({ unique: true})
    username: string;
    @Prop({type: [Types.ObjectId], ref: 'Group', default: []})
    groups: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);

export type UserDocument = HydratedDocument<User>;