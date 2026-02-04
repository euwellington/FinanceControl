export interface IPeople
{
    id: string;
    name: string;
    age: string;
    email: string;
    password: string;
}

export interface IPeopleRequest extends Partial<IPeople> {}

export interface IPeopleQueryParams {
    name?: string;
    age?: number;
    createdAt?: string;
    email?: string;
    page?: number;
    pageSize?: number;
}