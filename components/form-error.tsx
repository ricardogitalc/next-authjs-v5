import { BanIcon } from "lucide-react";

interface FormErrorProps {
  message?: string;
}

export const FormError = ({ message }: FormErrorProps) => {
  if (!message) return null;

  return (
    <div className="bg-error-foreground text-error p-3 rounded-md flex items-center gap-x-2 text-sm">
      <BanIcon className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
};
