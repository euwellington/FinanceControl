import DashboardAPI from '@/apis/DashboardAPI';
import type { IDashboardStats } from '@/interfaces/IDashboard';
import { handleApiError } from '@/utils/error-handler';
import { makeAutoObservable, runInAction } from 'mobx';

class DashboardStore {
    dashboard: IDashboardStats | null = null;
    loading: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    async getDashboard() {
        this.loading = true;
        try {
            const { data, status } = await DashboardAPI.getDashboard();
            runInAction(() => {
                if (status === 200) {
                    this.dashboard = data ?? null;
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

export default DashboardStore;