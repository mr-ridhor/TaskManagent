interface InputErrorProps {
    message: string | undefined;
    className?: string;
  }
  const InputError: React.FC<InputErrorProps> = ({
    message,
    className = "",
    ...props
  }) => {
    return message ? (
      <p {...props} className={"text-sm text-red-600 " + className}>
        {message}
      </p>
    ) : null;
  };
  
  export default InputError;
  