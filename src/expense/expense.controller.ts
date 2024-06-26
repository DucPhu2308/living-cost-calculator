import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Request, UseGuards } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { CreateExpenseDto } from './dtos/create-expense.dto';
import { UpdateExpenseDto } from './dtos/update-expense.dto';
import { AuthGuard } from 'src/user/auth.guard';
import { AddUserToExpenseDto } from './dtos/add-user-to-expense.dto';

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
    
    @Get(':expenseId')
    getExpenseById(@Param("expenseId") expenseId: string) {
        return this.expenseService.getExpenseById(expenseId);
    }

    @Put(':expenseId')
    updateExpense(@Param("expenseId") expenseId: string, @Body() updateExpenseDto: UpdateExpenseDto) {
        return this.expenseService.updateExpense(expenseId, updateExpenseDto);
    }

    @Delete(':expenseId')
    @UseGuards(AuthGuard) // chua test
    deleteExpense(@Param("expenseId") expenseId: string, @Request() req) {
        const actorId = req.user.sub;
        return this.expenseService.deleteExpense(expenseId, actorId);
    }

    @Patch('add-user') // chua test
    addUserToExpense(@Body() addUserToExpenseDto: AddUserToExpenseDto) {
        return this.expenseService.addUserToExpense(addUserToExpenseDto);        
    }

    @Patch('remove-user') // chua test
    removeUserFromExpense(@Body() addUserToExpenseDto: AddUserToExpenseDto) {
        return this.expenseService.removeUserFromExpense(addUserToExpenseDto);
    }

}
