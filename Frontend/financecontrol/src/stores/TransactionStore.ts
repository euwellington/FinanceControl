import TransactionAPI from '@/apis/TransactionAPI';
import type { IPaginated } from '@/interfaces/IPaginated';
import type { ITransaction, ITransactionQueryParams } from '@/interfaces/ITransaction';
import { handleApiError } from '@/utils/error-handler';
import { makeAutoObservable, runInAction } from 'mobx';

class TransactionStore {
    transactions: IPaginated<ITransaction> | null = null;
    selected: ITransaction | null = null;
    loading: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    async getAll(params: ITransactionQueryParams) {
        this.loading = true;
        try {
            const { data, status } = await TransactionAPI.getAll(params);
            runInAction(() => {
                if (status === 200) {
                    this.transactions = data ?? null;
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

    setSelected(id: string) {
        this.selected = this.transactions?.data.find(x => x.id === id) ?? null;
    }
}

export default TransactionStore;