import { handleApiError } from "@/utils/error-handler";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { StoresContext } from "@/stores/inject";
import type { ICategory } from "@/interfaces/ICategory";
import CategoryAPI from "@/apis/CategoryAPI";

export const useCategory = () => {

    const { categoryStore } = useContext(StoresContext);
    const [loading, setLoading] = useState(false);

    const insert = async (request: ICategory) => {
        setLoading(true);
        try {
            const { data } = await CategoryAPI.insert(request);
            if (data.error) {
                toast.error(data.message);
                return null;
            }
            categoryStore.getAll({});
            toast.success("Cadastrada com sucesso!");
            return data;
        } catch (error) {
            handleApiError(error, "Erro ao cadastrar");
        } finally {
            setLoading(false);
        }
    };

    const update = async (request: ICategory, toggle: () => void) => {
        setLoading(true);
        try {
            const { data } = await CategoryAPI.update(request);
            toast.success("Dados atualizados com sucesso!");
            categoryStore.getAll({});
            toggle();
            return data;
        } catch (error) {
            handleApiError(error, "Erro ao atualizar");
        } finally {
            setLoading(false);
        }
    };

    const remove = async (request: ICategory, toggle: () => void) => {
        setLoading(true);
        try {
            await CategoryAPI.delete(request.id);
            toast.success("Removida com sucesso!");
            categoryStore.getAll({});
            toggle();
            return true;
        } catch (error) {
            handleApiError(error, "Erro ao excluir");
            return false;
        } finally {
            setLoading(false);
        }
    };

    return {
        insert,
        update,
        remove,
        loading,
    };
};