import type { IPaginated } from "@/interfaces/IPaginated";
import type { IResponseAPI } from "@/interfaces/IResponse";
import type { ITransaction, ITransactionQueryParams } from "@/interfaces/ITransaction";
import api from "@/services/main/api";

class TransactionAPI {
    getAll = (params: ITransactionQueryParams) => api.get<IPaginated<ITransaction>>("/transaction", { params });

    insert = (request: ITransaction) => api.post<IResponseAPI<ITransaction>>("/transaction", request);

    update = (request: ITransaction) => api.put("/transaction", request);

    getById = (id: string) => api.get(`/transaction/${id}`);

    delete = (id: string) => api.delete(`/transaction/${id}`);
}

export default new TransactionAPI();