import { toast } from "react-toastify";

export const successNotify = (text: string) => {
  toast.success(text);
};

export const errorNotify = (text: string) => {
  toast.error(text);
};
