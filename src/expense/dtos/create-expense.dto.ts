
export class CreateExpenseDto {
    readonly name: string;
    readonly cost: number;
    readonly creator: string;
    readonly group: string;
    readonly shared_with: string[];
}