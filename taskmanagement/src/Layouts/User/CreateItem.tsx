import React, { useState } from "react";
import Card from "../../Components/Card";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodType } from "zod";
import { ItemTypes } from "../../Types/ItemsTypes";
import { useForm } from "react-hook-form";
import axiosClient from "../../axiosClient";
import { PrimaryButton, PrimaryButtonOutline } from "../../Components/Button";
import { TextInput } from "../../Components/TextInput";
import SelectInput from "../../Components/SelectInput";

interface Types {
  onClose: () => void;
}
const CreateItem: React.FC<Types> = ({ onClose }) => {
  const [loader, setLoader] = useState(false);
  const selectData = ["Intern", "Junior", "Intermediate", "Senior", "Expert"];
  const selectLevel = ["Low", "Medium", "High"];
  const schema: ZodType<ItemTypes> = z.object({
    title: z.string(),
    description: z.string(),
    levels: z.string(),
    tags: z.string(),
    due_date: z.string(),
  });
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ItemTypes>({
    resolver: zodResolver(schema),
  });
  const onSubmit = async (data: ItemTypes) => {
    setLoader(true);
    try {
      // Make a POST request to your Flask API's login endpoint
      const response = await axiosClient.post("/items", {
        tags: data.tags,
        title: data.title,
        levels: data.levels,
        description: data.description,
        due_date: data.due_date,
      });
      console.log(response.data);
      await axiosClient.get("/items");

      // Reset the form and perform any navigation or state updates
      reset();
      onClose();
    } catch (error) {
      // Handle login error, e.g., display an error message
      console.error("Create error:", error);
    }
  };
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-70">
      <Card className="md:w-[500px] rounded-lg w-full h-fit">
        <h2 className="text-lg font-semibold mb-4">Create Item</h2>
        <div className="">
          <form
            className="flex flex-col space-y-4 pb-10"
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextInput
              type="text"
              name="title"
              label="Title"
              register={register}
              error={errors.title}
            />
            <div className="">
              <TextInput
                type="date"
                name="due_date"
                label="Due date"
                register={register}
                error={errors.due_date}
              />
            </div>
            <div className="">
              <SelectInput
                data={selectLevel}
                name="levels"
                label="Level"
                register={register}
                error={errors.levels}
                className="outline-none border rounded-md"
              />
            </div>
            <div className="m">
              <SelectInput
                data={selectData}
                name="tags"
                label="Tags"
                register={register}
                error={errors.tags}
                className="outline-none border rounded-md"
              />
            </div>
            <div className="">
              <TextInput
                type="text"
                name="description"
                label="Description"
                register={register}
                error={errors.description}
                maxlength={20}
              />
            </div>
            <div className="mt-14 w-full flex gap-4 items-center justify-between">
              <PrimaryButton
                loading={loader}
                className="w-full font-bold uppercase "
              >
                Save
              </PrimaryButton>
              <PrimaryButtonOutline
                className="w-full font-bold uppercase"
                onClick={onClose}
              >
                Cancel
              </PrimaryButtonOutline>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default CreateItem;
