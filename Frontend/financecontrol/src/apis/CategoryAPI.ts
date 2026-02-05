import type { ICategory, ICategoryQueryParams } from "@/interfaces/ICategory";
import type { IPaginated } from "@/interfaces/IPaginated";
import type { IResponseAPI } from "@/interfaces/IResponse";
import api from "@/services/main/api";

class CategoryAPI {
    getAll = (params: ICategoryQueryParams) => api.get<IPaginated<ICategory>>("/category", { params });

    insert = (request: ICategory) => api.post<IResponseAPI<ICategory>>("/category", request);

    update = (request: ICategory) => api.put("/category", request);

    getById = (id: string) => api.get(`/category/${id}`);

    delete = (id: string) => api.delete(`/category/${id}`);
}

export default new CategoryAPI();