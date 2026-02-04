import PeopleAPI from '@/apis/PeopleAPI';
import type { IPaginated } from '@/interfaces/IPaginated';
import type { IPeople, IPeopleQueryParams } from '@/interfaces/IPeople';
import { handleApiError } from '@/utils/error-handler';
import { makeAutoObservable, runInAction } from 'mobx';

class PeopleStore {
    people: IPaginated<IPeople> | null = null;
    selected: IPeople | null = null;
    loading: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    async getAll(params: IPeopleQueryParams) {
        this.loading = true;
        try {
            const { data, status } = await PeopleAPI.getAll(params);
            runInAction(() => {
                if (status === 200) {
                    this.people = data ?? null;
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
        this.selected = this.people?.data.find(x => x.id === id) ?? null;
    }
}

export default PeopleStore;