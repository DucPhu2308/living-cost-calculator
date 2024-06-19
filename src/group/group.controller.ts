import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dtos/create-group.dto';
import { AddUserDto } from './dtos/add-user.dto';

@Controller('api/group')
export class GroupController {
    constructor(private readonly groupService: GroupService) { }

    @Post()
    createGroup(@Body() createGroupDto: CreateGroupDto) {
        return this.groupService.createGroup(createGroupDto);
    }

    @Put('add-user')
    addUser(@Body() addUserDto: AddUserDto) {
        return this.groupService.addUser(addUserDto);
    }

    @Put('remove-user')
    removeUser(@Body() removeUserDto: AddUserDto) {
        return this.groupService.removeUser(removeUserDto);
    }

    @Get('user/:userId')
    getGroupsByUserId(@Param('userId') userId: string) {
        return this.groupService.getGroupsByUserId(userId);
    }

}
