import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Expense } from 'src/schemas/expense.schema';
import { CreateExpenseDto } from './dtos/create-expense.dto';
import { Group } from 'src/schemas/group.schema';
import { User } from 'src/schemas/user.schema';
import { UpdateExpenseDto } from './dtos/update-expense.dto';

@Injectable()
export class ExpenseService {
    constructor(
        @InjectModel(Expense.name) private expenseModel: Model<Expense>,
        @InjectModel(Group.name) private groupModel: Model<Group>,
        @InjectModel(User.name) private userModel: Model<User>,
    ) { }

    async createExpense(expense: CreateExpenseDto) {
        const newExpense = new this.expenseModel(expense);
        newExpense.created_date = new Date();

        // check existence of members shared_with this expense
        for (const userId of expense.shared_with) {
            const user = await this.userModel.findById(userId);
            if (!user) {
                throw new HttpException('One(s) of the users in shared_with not found', 404);
            }
        }

        return newExpense.save();
    }

    async getExpensesByGroupId(groupId: string) {
        return await this.expenseModel.find({ group: groupId });
    }

    async getExpenseById(expenseId: string) {
        return await this.expenseModel.findById(new Types.ObjectId(expenseId));
    }

    async updateExpense(expenseId: string, expense: UpdateExpenseDto) {
        const updatedExpense = await this.expenseModel.findByIdAndUpdate(new Types.ObjectId(expenseId), expense, { new: true });
        if (!updatedExpense) {
            throw new HttpException('Expense not found', 404);
        }

        return updatedExpense;
    }

    async deleteExpense(expenseId: string, actorId: string) {
        // if the creator still in the group, only the creator can delete the expense
        // otherwise, any user in the group can delete the expense

        const expense = await this.expenseModel.findById(expenseId);
        if (!expense) {
            throw new HttpException('Expense not found', 404);
        }

        const groupId = expense.group;

        // populate the group
        const group = await this.groupModel.findById(groupId);

        // check if the creator is in the group
        const creatorIndex = group.users.findIndex(userId => userId.toString() === expense.creator.toString());
        if (creatorIndex !== -1) { // creator is in the group
            if (actorId !== expense.creator.toString()) { // actor is not the creator
                throw new HttpException('Only the creator can delete the expense', 403);
            } else {
                return await this.expenseModel.deleteOne({ _id: expenseId });
            }
        } else { // creator is not in the group
            const actorIndex = group.users.findIndex(userId => userId.toString() === actorId);
            if (actorIndex === -1) {
                throw new HttpException('You are not in the group', 403);
            } else { // actor is in the group, so he can delete the expense
                return await this.expenseModel.deleteOne({ _id: expenseId });
            }
        }
    }
}
