import CategoryAPI from '@/apis/CategoryAPI';
import type { ICategory, ICategoryQueryParams } from '@/interfaces/ICategory';
import type { IPaginated } from '@/interfaces/IPaginated';
import { handleApiError } from '@/utils/error-handler';
import { makeAutoObservable, runInAction } from 'mobx';

class CategoryStore {
    categories: IPaginated<ICategory> | null = null;
    selected: ICategory | null = null;
    loading: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    async getAll(params: ICategoryQueryParams) {
        this.loading = true;
        try {
            const { data, status } = await CategoryAPI.getAll(params);
            runInAction(() => {
                if (status === 200) {
                    this.categories = data ?? null;
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
        this.selected = this.categories?.data.find(x => x.id === id) ?? null;
    }
}

export default CategoryStore;