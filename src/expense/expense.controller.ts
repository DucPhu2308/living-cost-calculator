import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { CreateExpenseDto } from './dtos/create-expense.dto';

@Controller('api/expense')
export class ExpenseController {
    constructor(private readonly expenseService: ExpenseService) { }

    @Post()
    createExpense(@Body() createExpenseDto: CreateExpenseDto) {
        return this.expenseService.createExpense(createExpenseDto);
    }

    @Get('group/:groupId')
    getExpensesByGroupId(@Param("groupId") groupId: string) {
        return this.expenseService.getExpensesByGroupId(groupId);
    }
}
