import { ReactNode } from "react";

interface InputLabelProps {
  value: string | undefined;
  className?: string;
  children?: ReactNode;
  required?: boolean;
}

const InputLabel: React.FC<InputLabelProps> = ({
  value,
  className = "",
  children,
  required = false,
  ...props
}) => {
  return (
    <label {...props} className={`block font-medium text-sm  ` + className}>
      {value ? value : children}{" "}
      {required && <span className="text-red-500 text-lg">*</span>}
    </label>
  );
};

export default InputLabel;
