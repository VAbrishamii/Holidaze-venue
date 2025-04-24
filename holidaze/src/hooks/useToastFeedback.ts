import { toast } from "react-hot-toast";

/**
 * A reusable toast feedback hook
 * Provides simple wrapper functions for common toast usage
 */

let toastId: string | undefined;

export const useToastFeedback = () => {
  return {
    loading: (message: string) => {
      toastId = toast.loading(message);
    },
    success: (message: string) => {
      if (toastId) {
        toast.success(message, { id: toastId });
        toastId = undefined;
      } else {
        toast.success(message);
      }
    },
    error: (message: string) => {
      if (toastId) {
        toast.error(message, { id: toastId });
        toastId = undefined;
      } else {
        toast.error(message);
      }
    },
    dismiss: () => {
      if (toastId) {
        toast.dismiss(toastId);
        toastId = undefined;
      }
    },
  };
};
