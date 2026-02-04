export interface IResponse
{
    data: string;
    error: boolean;
    message: string;
}

export interface IResponseAPI<T>
{
    data: T;
    error: boolean;
    message: string;
}