import { handleApiError } from "@/utils/error-handler";
import { useContext, useState } from "react";
import toast from "react-hot-toast";
import type { IPeople } from "@/interfaces/IPeople";
import PeopleAPI from "@/apis/PeopleAPI";
import { StoresContext } from "@/stores/inject";
import md5 from "md5";

export const usePeople = () => {

    const { peopleStore } = useContext(StoresContext);
    const [loading, setLoading] = useState(false);

    const insert = async (request: IPeople) => {
        setLoading(true);
        var password = request.password;

        try {
            request.password = md5(request.password);
            const { data } = await PeopleAPI.insert(request);
            if (data.error) {
                toast.error(data.message);
                return null;
            }
            peopleStore.getAll({});
            toast.success("Pessoa cadastrada com sucesso!");
            return data;
        } catch (error) {
            handleApiError(error, "Erro ao cadastrar pessoa");
            request.password = password;
        } finally {
            setLoading(false);
            request.password = password;
        }
    };

    const update = async (request: IPeople, toggle: () => void) => {
        setLoading(true);
        try {
            const { data } = await PeopleAPI.update(request);
            toast.success("Dados atualizados com sucesso!");
            peopleStore.getAll({});
            toggle();
            return data;
        } catch (error) {
            handleApiError(error, "Erro ao atualizar pessoa");
        } finally {
            setLoading(false);
        }
    };

    const remove = async (request: IPeople, toggle: () => void) => {
        setLoading(true);
        try {
            await PeopleAPI.delete(request.id);
            toast.success("Pessoa removida com sucesso!");
            peopleStore.getAll({});
            toggle();
            return true;
        } catch (error) {
            handleApiError(error, "Erro ao excluir pessoa");
            return false;
        } finally {
            setLoading(false);
        }
    };

    const firstRegister = async (request: IPeople) => {
        setLoading(true);
        var password = request.password;

        try {

            request.password = md5(request.password);

            const { data } = await PeopleAPI.firstRegister(request);
            toast.success("Registro inicial realizado!");
            return data;
        } catch (error) {
            handleApiError(error, "Erro no registro inicial");
            request.password = password;
        } finally {
            setLoading(false);
            request.password = password;
        }
    };

    return {
        insert,
        update,
        remove,
        firstRegister,
        loading,
    };
};