export interface ILogin
{
    serviceId: string;
    email: string;
    password: string;
}

export interface ILoginRequest extends Partial<ILogin> {}