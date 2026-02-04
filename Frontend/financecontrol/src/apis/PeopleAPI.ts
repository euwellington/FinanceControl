import type { IPaginated } from "@/interfaces/IPaginated";
import type { IPeople, IPeopleQueryParams } from "@/interfaces/IPeople";
import type { IResponseAPI } from "@/interfaces/IResponse";
import api from "@/services/main/api";

class PeopleAPI {
    getAll = (params: IPeopleQueryParams) => api.get<IPaginated<IPeople>>("/people", { params });

    insert = (request: IPeople) => api.post<IResponseAPI<IPeople>>("/people", request);

    update = (request: IPeople) => api.put("/people", request);

    getById = (id: string) => api.get(`/people/${id}`);

    delete = (id: string) => api.delete(`/people/${id}`);

    firstRegister = (request: IPeople) => api.post("/people/first/register", request);
}

export default new PeopleAPI();