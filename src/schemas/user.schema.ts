import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { Group } from "./group.schema";


@Schema()
export class User {
    @Prop({ type: Types.ObjectId, default:() => new Types.ObjectId()})
    _id: string;
    @Prop({ unique: true })
    email: string;
    @Prop()
    password: string;
    @Prop({ unique: true })
    username: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

export type UserDocument = HydratedDocument<User>;