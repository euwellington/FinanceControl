import ReportAPI from '@/apis/ReportAPI';
import type { IPaginatedReport } from '@/interfaces/IPaginatedReport';
import type { ICategoryTotal, IPersonTotal, IReportPeopleQueryParams } from '@/interfaces/IReport';
import { handleApiError } from '@/utils/error-handler';
import { makeAutoObservable, runInAction } from 'mobx';

class ReportStore {
    transactionPeople: IPaginatedReport<IPersonTotal> | null = null;
    transactionCategory: IPaginatedReport<ICategoryTotal> | null = null;
    loading: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    async getTransactionsPeople(request: IReportPeopleQueryParams) {
        this.loading = true;
        try {
            const { data, status } = await ReportAPI.getTransactionPeople(request);
            runInAction(() => {
                if (status === 200) {
                    this.transactionPeople = data ?? null;
                }
            });
        }
        catch (e) {
            handleApiError(e);
        }
        finally {
            this.loading = false;
        }
    }

        async getTransactionCategory(request: IReportPeopleQueryParams) {
        this.loading = true;
        try {
            const { data, status } = await ReportAPI.getTransactionCategory(request);
            runInAction(() => {
                if (status === 200) {
                    this.transactionCategory = data ?? null;
                }
            });
        }
        catch (e) {
            handleApiError(e);
        }
        finally {
            this.loading = false;
        }
    }

}

export default ReportStore;