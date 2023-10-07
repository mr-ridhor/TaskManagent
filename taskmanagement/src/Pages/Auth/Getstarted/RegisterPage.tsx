import { useForm } from "react-hook-form";
import { PrimaryButton, PrimaryButtonOutline } from "../../../Components/Button";

import Card from "../../../Components/Card";
import { AuthTypes } from "../../../Types/AuthTypes";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

import { TextInput } from "../../../Components/TextInput";
import axiosClient from "../../../axiosClient";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();

  const schema: ZodType<AuthTypes> = z
    .object({
      name: z.string().min(2).max(30),
      username: z.string().min(4).max(30),
      email: z.string().email(),
      password: z.string().min(6),
      confirmPassword: z.string().min(6),
     
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Password does not match",
      path: ["confirmPassword"],
    })
    

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<AuthTypes>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async(data: AuthTypes) => {
    setProcessing(true);
    try {
      // Send a POST request to your registration endpoint
      const response = await axiosClient.post('/auth/signup', {
        name: data.name,
        username: data.username,
        email: data.email,
        password: data.password,
      });
  
      // Handle the response here, e.g., show a success message to the user
      console.log(response);
  
      // Reset the form after successful registration
      reset();
  
      // You can also navigate to a success page or perform other actions here
      // navigate('/success-page');
    } catch (error) {
      // Handle registration error, e.g., display an error message
      console.error('Registration error:', error);
  
      // Reset the loader state
      setProcessing(false);
    }
  };

  return (
    <div className="w-full h-full flex items-center justify-center ">
      {/* maxWidth="xl" */}
      <Card className="lg:w-[40%] sm:w-[90%] w-[60%] max:h-[600px]  rounded-md px-3">
        <div className=" gap-4 ">
          <div className="order-2 sm:order-1  ">
            <h2 className="font-bold mb-2">Sign up</h2>
            <form
              className="flex flex-col space-y-4"
              onSubmit={handleSubmit(onSubmit)}
            >
              <TextInput
                type="text"
                name="name"
                label="Name"
                register={register}
                error={errors.name}
              />

              <TextInput
                type="text"
                name="username"
                label="Username"
                register={register}
                error={errors.username}
              />

              <TextInput
                type="text"
                name="email"
                label="Email"
                register={register}
                error={errors.email}
              />

              <TextInput
                type="password"
                name="password"
                label="Password"
                register={register}
                error={errors.password}
              />

              <TextInput
                type="password"
                name="confirmPassword"
                label="Password Confirmation"
                register={register}
                error={errors.confirmPassword}
              />
<div className="flex justify-between">

              <div>
                <PrimaryButton
                  loading={processing}
                  className="w-full rounded-lg uppercase"
                >
                  Register
                </PrimaryButton>
                
              </div>
              <div className="">
              <PrimaryButtonOutline
          className="w-full font-bold uppercase"
          onClick={() => navigate("/auth/login")}
        >
          Login
        </PrimaryButtonOutline>
              </div>
</div>
            </form>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default RegisterPage;
