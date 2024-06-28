class UserResponse {
    readonly _id: string;
    readonly username: string;
    readonly email: string;
}

export class ExpenseResponse {
    readonly _id: string;
    readonly name: string;
    readonly cost: number;
    readonly creator: UserResponse;
    readonly group: string;
    readonly shared_with: UserResponse[];
    readonly created_date: Date;
    readonly done_date: Date;
}