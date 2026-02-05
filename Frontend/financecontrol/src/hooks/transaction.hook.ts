import { handleApiError } from "@/utils/error-handler";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import { StoresContext } from "@/stores/inject";
import type { ITransaction } from "@/interfaces/ITransaction";
import TransactionAPI from "@/apis/TransactionAPI";

export const useTransaction = () => {

    const { transactionStore } = useContext(StoresContext);
    const [loading, setLoading] = useState(false);

    const insert = async (request: ITransaction, toggle: () => void) => {
        setLoading(true);
        try {
            const { data } = await TransactionAPI.insert(request);
            if (data.error) {
                toast.error(data.message);
                return null;
            }
            transactionStore.getAll({});
            toggle();
            toast.success("Cadastrada com sucesso!");
            return data;
        } catch (error) {
            handleApiError(error, "Erro ao cadastrar");
        } finally {
            setLoading(false);
        }
    };

    const update = async (request: ITransaction, toggle: () => void) => {
        setLoading(true);
        try {
            const { data } = await TransactionAPI.update(request);
            toast.success("Dados atualizados com sucesso!");
            transactionStore.getAll({});
            toggle();
            return data;
        } catch (error) {
            handleApiError(error, "Erro ao atualizar");
        } finally {
            setLoading(false);
        }
    };

    const remove = async (request: ITransaction, toggle: () => void) => {
        setLoading(true);
        try {
            await TransactionAPI.delete(request.id);
            toast.success("Removida com sucesso!");
            transactionStore.getAll({});
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