import { AxiosError } from "axios";
import toast from "react-hot-toast";

export const handleApiError = (error: unknown, fallbackMessage = "Erro ao processar requisição") => {
  let message = fallbackMessage;

  if (error instanceof AxiosError) {
    message = error.response?.data?.message || error.message || fallbackMessage;
  } else if (error instanceof Error) {
    message = error.message;
  }

  toast.error(message);
  console.error("[API Error]:", { message, originalError: error });
  
  return message;
};