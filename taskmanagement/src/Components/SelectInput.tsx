import { FieldError, UseFormRegister } from "react-hook-form";
import InputError from "./InputError";

type SelectInputProps = {
    data: (string | number)[];
    label?: string;
    className?: string;
    name: string;
    register: UseFormRegister<any>;
  error?: FieldError | undefined;
  };
  
  const SelectInput = ({ data, label, className, name,register,
    error }: SelectInputProps) => {
    return (
      <div className="flex flex-col gap-2">
        <label >{label}</label>
        <select  className={`p-2 ${className}`}  {...register(name)}>
          <option>Select</option>
          {data.map((item, i) => (
            <option key={i} value={item}>
              {item}
            </option>
          ))}
        </select>
      {error && <InputError message={error.message} />}

      </div>
    );
  };
  
  export default SelectInput;