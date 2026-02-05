import type { IPaginatedReport } from "@/interfaces/IPaginatedReport";
import type { ICategoryTotal, IPersonTotal, IReportCategoryQueryParams, IReportPeopleQueryParams } from "@/interfaces/IReport";
import api from "@/services/main/api";

class TransactionAPI {
    getTransactionPeople = (params: IReportPeopleQueryParams) => api.get<IPaginatedReport<IPersonTotal>>("/report/transactionspeople", { params });
    getTransactionCategory = (params: IReportCategoryQueryParams) => api.get<IPaginatedReport<ICategoryTotal>>("/report/transactionscategory", { params });
}

export default new TransactionAPI();