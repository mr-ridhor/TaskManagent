import React, { useState, useEffect } from "react";
import Card from "../../Components/Card";
import { zodResolver } from "@hookform/resolvers/zod";
import { z, ZodType } from "zod";
import { ItemTypes } from "../../Types/ItemsTypes";
import { useForm } from "react-hook-form";
import axiosClient from "../../axiosClient";
import { PrimaryButton, PrimaryButtonOutline } from "../../Components/Button";
import { TextInput } from "../../Components/TextInput";
import SelectInput from "../../Components/SelectInput";

interface UpdateItemProps {
  item: ItemTypes;
  onUpdate: (updatedData: ItemTypes) => void;
  onClose: () => void;
}

const UpdateItem: React.FC<UpdateItemProps> = ({ item, onUpdate, onClose }) => {
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
    setValue,
  } = useForm<ItemTypes>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    setValue("title", item.title);
    setValue("description", item.description);
    setValue("levels", item.levels);
    setValue("tags", item.tags);
    setValue("due_date", item.due_date);
  }, [item, setValue]);

  const onSubmit = async (data: ItemTypes) => {
    setLoader(true);
    try {
      const response = await axiosClient.put(`/items/${item.id}`, data);

      console.log(response.data);

      onUpdate(data);

      onClose();
      reset();
    } catch (error) {
      console.error("Update error:", error);
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-70">
      <Card className="md:w-[500px] rounded-lg w-full h-fit">
        <h2 className="text-lg font-semibold mb-4">Update Item</h2>
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
                className="w-full font-bold uppercase"
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

export default UpdateItem;
