import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Expense } from 'src/schemas/expense.schema';
import { CreateExpenseDto } from './dtos/create-expense.dto';

@Injectable()
export class ExpenseService {
    constructor(@InjectModel(Expense.name) private expenseModel: Model<Expense>) { }

    async createExpense(expense: CreateExpenseDto) {
        const newExpense = new this.expenseModel(expense);
        newExpense.created_date = new Date();
        return newExpense.save();
    }

    async getExpensesByGroupId(groupId: string) {
        return await this.expenseModel.find({ group: groupId });
    }
}
