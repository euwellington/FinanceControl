import LoginAPI from "@/apis/LoginAPI"
import type { ILogin } from "@/interfaces/ILogin"
import { handleApiError } from "@/utils/error-handler";
import { useState } from "react";
import toast from "react-hot-toast"

const service_application = import.meta.env.VITE_SERVICE_APPLICATION;

export const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const authentication = async (request: ILogin) => {
        setLoading(true);
        setSuccess(false);
        request.serviceId = service_application;

        try {
            const { data } = await LoginAPI.login(request);

            if (data.error) {
                toast.error(data.message);
                return;
            }
            else {
                localStorage.setItem("@token", data.data);

                setSuccess(true);
                toast.success("Login realizado com sucesso!");

                setTimeout(() => {
                    window.location.href = '/dashboard';
                }, 1000);
            }


        } catch (error: any) {
            setSuccess(false);
            handleApiError(error, "Erro ao tentar realizar login");
        } finally {
            setLoading(false);
        }
    }

    return {
        authentication,
        loading,
        success
    }
}