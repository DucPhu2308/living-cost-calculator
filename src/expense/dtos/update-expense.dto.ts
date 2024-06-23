
export class UpdateExpenseDto {
    readonly name: string;
    readonly cost: number;
    readonly shared_with: string[];
}