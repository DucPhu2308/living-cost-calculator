import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Group } from 'src/schemas/group.schema';
import { CreateGroupDto } from './dtos/create-group.dto';
import { AddUserDto } from './dtos/add-user.dto';
import { create } from 'domain';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class GroupService {
    async removeUser(removeUserDto: AddUserDto) {
        const group = await this.groupModel.findById(new Types.ObjectId(removeUserDto.groupId));
        if (!group) {
            throw new HttpException('Group not found', 404);
        }
        group.users = group.users.filter(
            userId => !removeUserDto.userIds.includes(userId.toString())
        );
        return group.save();
    }
    
    constructor(
        @InjectModel(Group.name) private groupModel: Model<Group>,
        @InjectModel(User.name) private userModel: Model<User>
    ) { }
    async createGroup(createGroupDto: CreateGroupDto) {
        // check if user exists
        for (const userId of createGroupDto.users) {
            console.log(typeof userId);
            const user = await this.userModel.findOne({ _id: userId});
            if (!user) {
                throw new HttpException('User not found', 404);
            }
        }
        const checkCreator = await this.userModel.findOne({ _id: createGroupDto.creator});
        if (!checkCreator) {
            throw new HttpException('Creator not found', 404);
        }
        const group = new this.groupModel(createGroupDto);
        return group.save();
    }
    async addUser(addUserDto: AddUserDto) {
        const group = await this.groupModel.findOne({ _id: new Types.ObjectId(addUserDto.groupId) });
        if (!group) {
            throw new HttpException('Group not found', 404);
        }
        
        for (const userId of addUserDto.userIds) {
            const user: User = await this.userModel.findOne({ _id: new Types.ObjectId(userId) });
            if (!user) {
                throw new HttpException('User not found', 404);
            }

            // check if the user is already in the group
            const userIndex = group.users.findIndex(id => id.toString() === userId);
            if (userIndex === -1) {
                group.users.push(userId);
            }
        }

        return group.save();
    }

    async getGroupsByUserId(userId: string) {
        return await this.groupModel.find({ users: new Types.ObjectId(userId)});
    }

    async deleteGroupById(groupId: string, actorId: string) {
        // only creator can delete group
        const group = await this.groupModel.findOne({ _id: new Types.ObjectId(groupId) });
        if (!group) {
            throw new HttpException('Group not found', 404);
        }

        if (group.creator.toString() !== actorId) {
            throw new HttpException('Unauthorized', 401);
        }

        try {
            await this.groupModel.deleteOne({ _id: new Types.ObjectId(groupId)});
            return 'Group deleted successfully';
        } catch (err) {
            throw new HttpException('Error: ' + err, 500);
        }
    }
}
