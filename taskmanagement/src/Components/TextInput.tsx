import { FieldError, UseFormRegister } from "react-hook-form";
import InputError from "./InputError";
import InputLabel from "./InputLabel";
import { ReactNode } from "react";

interface TextInputProps {
  type?: string;
  name: string;
  label?: string;
  register: UseFormRegister<any>; // Adjust the type as needed
  error?: FieldError | undefined;
  children?: ReactNode;
  className?: string;
  maxlength?:number;
}

export const TextInput: React.FC<TextInputProps> = ({
  type,
  name,
  label,
  register,
  maxlength,
  error,
}) => {
  return (
    <div className="flex flex-col space-y-1 w-full">
      <InputLabel value={label} />
      <input
      maxLength={maxlength}
        type={type}
        className={`w-full h-9 bg-inherit border border-gray-300 dark:border-slate-700 focus:border-blue-500 focus:ring-indigo-500 rounded-sm shadow-sm px-2 `}
        {...register(name)}
      />
      {error && <InputError message={error.message} />}
    </div>
  );
};