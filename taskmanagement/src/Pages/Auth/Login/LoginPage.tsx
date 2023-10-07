import Card from "../../../Components/Card";
import { z, ZodType } from "zod";
import { AuthTypes } from "../../../Types/AuthTypes";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { TextInput } from "../../../Components/TextInput";
import {
  PrimaryButton,
  PrimaryButtonOutline,
} from "../../../Components/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../../axiosClient";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const schema: ZodType<AuthTypes> = z.object({
    username: z
      .string()
      .min(4)
      .max(30)
      .refine((val) => val.trim() !== "", {
        message: "Username is required",
      }),
    password: z
      .string()
      .min(6)
      .refine((val) => val.trim() !== "", {
        message: "Password is required",
      }),
  });

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthTypes>({
    resolver: zodResolver(schema),
  });
  const onSubmit = async (data: AuthTypes) => {
    setLoader(true);
    try {
      // Make a POST request to your Flask API's login endpoint
      const response = await axiosClient.post("/auth/login", {
        username: data.username,
        password: data.password,
      });
      console.log(response.data);

      const { access_token } = response.data;

      localStorage.setItem("access_token", access_token);

      // Redirect the user to a protected route or perform other actions
      navigate("/user");
      reset();
    } catch (error: any) {
      // Handle login error, e.g., display an error message
      console.error("Login error:", error);
      // alert(error.response.data.error )

      if (error.response.data.error === "Invalid username") {
        return toast.error(error.response.data.error);
      }
      // return toast.error("Something went wrong please try again");

      // Reset the loader state
      setLoader(false);
    }
  };
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Card maxWidth="xl" className="w-[90%]  px-4">
        <h2 className="font-bold text-base md:text-xl xl:text2xl">Login</h2>
        <form
          className="flex flex-col space-y-4 pb-10"
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextInput
            type="text"
            name="username"
            label="Username"
            register={register}
            error={errors.username}
          />

          <TextInput
            type="password"
            name="password"
            label="Password"
            register={register}
            error={errors.password}
          />
          <PrimaryButton
            loading={loader}
            className="w-full font-bold uppercase "
          >
            Login
          </PrimaryButton>
          <PrimaryButtonOutline
            className="w-full font-bold uppercase"
            onClick={() => navigate("/auth/register")}
          >
            Sign up
          </PrimaryButtonOutline>
        </form>
      </Card>
      {/* <Toaster position="top-center" reverseOrder={false} /> */}
    </div>
  );
};

export default LoginPage;
