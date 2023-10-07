import { ReactNode } from "react";
import { ClipLoader } from "react-spinners";
import { twMerge } from "tailwind-merge";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
  children?: ReactNode;
  loading?: boolean;
  onClick?: () => void;
}

export const PrimaryButton: React.FC<ButtonProps> = ({
  className = "",
  disabled,
  children,
  loading,
  onClick,
  ...props
}) => {
  return (
    <button
      {...props}
      onClick={onClick}
      className={twMerge(
        `inline-flex items-center justify-center px-4 py-2 bg-blue-500 dark:bg-gray-600 border border-transparent rounded-sm font-semibold text-xs text-white tracking-widest hover:opacity-70 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 ${
          disabled && "opacity-25"
        }`,
        className
      )}
      disabled={disabled ?? loading}
    >
      {loading ? (
        <ClipLoader
          size={12}
          color={"gray"}
          loading={disabled}
          className="my-1"
        />
      ) : (
        <>{children}</>
      )}
    </button>
  );
};

export const PrimaryButtonRounded: React.FC<ButtonProps> = ({
  className = "",
  disabled,
  children,
  loading,
  onClick,
  ...props
}) => {
  return (
    <button
      {...props}
      onClick={onClick}
      className={twMerge(
        `inline-flex items-center justify-center px-4 py-2 bg-primary dark:bg-gray-600 border border-transparent rounded-3xl font-semibold text-xs text-white tracking-widest hover:opacity-70 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 ${
          disabled && "opacity-25"
        }`,
        className
      )}
      disabled={disabled ?? loading}
    >
      {loading ? (
        <ClipLoader
          size={12}
          color={"gray"}
          loading={disabled}
          className="my-1"
        />
      ) : (
        <>{children}</>
      )}
    </button>
  );
};

export const DangerButton: React.FC<ButtonProps> = ({
  className = "",
  disabled,
  children,
  loading,
  ...props
}) => {
  return (
    <button
      {...props}
      className={twMerge(
        `inline-flex items-center px-4 py-2 bg-red-600 border border-transparent rounded-sm font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-500 active:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition ease-in-out duration-150 ${
          disabled && "opacity-25"
        }`,
        className
      )}
      disabled={disabled ?? loading}
    >
      {loading ? (
        <ClipLoader
          size={12}
          color={"gray"}
          loading={disabled}
          className="my-1"
        />
      ) : (
        <>{children}</>
      )}
    </button>
  );
};

export const SecondaryButton: React.FC<ButtonProps> = ({
  type = "button",
  className = "",
  disabled,
  children,
  loading,
  ...props
}) => {
  return (
    <button
      {...props}
      type={type}
      className={twMerge(
        `inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-sm font-semibold text-xs text-gray-700 uppercase tracking-widest shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-25 transition ease-in-out duration-150 ${
          disabled && "opacity-25"
        }`,
        className
      )}
      disabled={disabled ?? loading}
    >
      {loading ? (
        <ClipLoader
          size={12}
          color={"gray"}
          loading={disabled}
          className="my-1"
        />
      ) : (
        <>{children}</>
      )}
    </button>
  );
};

export const PrimaryButtonOutline: React.FC<ButtonProps> = ({
  className = "",
  disabled,
  children,
  loading,
  ...props
}) => {
  return (
    <button
      {...props}
      className={twMerge(
        `inline-flex items-center justify-center px-4 py-2 border border-primary  rounded-sm font-semibold text-xs tracking-widest hover:opacity-60 focus:bg-gray-700 active:bg-gray-900/10 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150 ${
          disabled && "opacity-25"
        }`,
        className
      )}
      disabled={disabled ?? loading}
    >
      {loading ? (
        <ClipLoader
          size={12}
          color={"gray"}
          loading={disabled}
          className="my-1"
        />
      ) : (
        <>{children}</>
      )}
    </button>
  );
};

export const PrimaryButtonOutlineRoundedFullNoBg: React.FC<ButtonProps> = ({
  className = "",
  disabled,
  children,
  loading,
  ...props
}) => {
  return (
    <button
      {...props}
      className={twMerge(
        `inline-flex items-center justify-center px-4 py-3 border rounded-full font-semibold text-xs tracking-widest hover:opacity-60 focus:bg-gray-700 active:bg-gray-900/10 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150${
          disabled && "opacity-25"
        }`,
        className
      )}
      disabled={disabled ?? loading}
    >
      {loading ? (
        <ClipLoader
          size={12}
          color={"gray"}
          loading={disabled}
          className="my-1"
        />
      ) : (
        <>{children}</>
      )}
    </button>
  );
};
