import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Group } from 'src/schemas/group.schema';
import { CreateGroupDto } from './dtos/create-group.dto';
import { AddUserDto } from './dtos/add-user.dto';
import { create } from 'domain';

@Injectable()
export class GroupService {
    async removeUser(removeUserDto: AddUserDto) {
        const group = await this.groupModel.findById(removeUserDto.groupId);
        if (!group) {
            throw new HttpException('Group not found', 404);
        }
        group.users = group.users.filter(userId => !removeUserDto.userIds.includes(userId));
        return group.save();
    }
    
    constructor(@InjectModel(Group.name) private groupModel: Model<Group>) { }
    async createGroup(createGroupDto: CreateGroupDto) {
        // check if user exists
        for (const userId of createGroupDto.users) {
            const user = await this.groupModel.findOne({ _id: userId });
            if (!user) {
                throw new HttpException('User not found', 404);
            }
        }
        const checkCreator = await this.groupModel.findOne({ _id: createGroupDto.creator });
        if (!checkCreator) {
            throw new HttpException('Creator not found', 404);
        }
        const group = new this.groupModel(createGroupDto);
        return group.save();
    }
    async addUser(addUserDto: AddUserDto) {
        const group = await this.groupModel.findById(addUserDto.groupId);
        if (!group) {
            throw new HttpException('Group not found', 404);
        }
        for (const userId of addUserDto.userIds) {
            // check if user exists and not already in the group
            const user = await this.groupModel.findOne({ _id: userId });
            if (!user) {
                throw new HttpException('User not found', 404);
            }
            if (group.users.includes(userId)) {
                throw new HttpException('User already in the group', 400);
            }

            group.users.push(userId);
        }
        return group.save();
    }
}
