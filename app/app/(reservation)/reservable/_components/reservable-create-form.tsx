"use client";
import { InputForm } from "@/components/forms/input";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import { createReservableAction } from "../_actions/create-reservable";
import { toast } from "sonner";
import React from "react";


const CreateReservableFormSchema = z.object({
  name: z.string(),
  capacity: z.coerce.number().min(0, "Capacity must be greater than 0"),
  location: z.string(),
  description: z.string(),
});

type CreateReservableFormValues = z.infer<typeof CreateReservableFormSchema>;

export function CreateReservableForm(props: any) {
  const { setOpen } = props;
  const [isLoading, setIsLoading] = React.useState(false);
  const form = useForm<CreateReservableFormValues>({
    resolver: zodResolver(CreateReservableFormSchema),
    defaultValues: {
      name: "",
      capacity: 0,
      location: "",
      description: "",
    },
  });

  const handleSubmit = async (values: CreateReservableFormValues) => {
    setIsLoading(true);
    const res = await createReservableAction(values);
    if (res.ok) {
      setOpen(false);
      toast.success("Reservable created");
    } else {
      toast.error("Failed to create reservable");
    }
    setIsLoading(true);
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col space-y-3"
        >
          <InputForm form={form} name="name" label="Name" msg />
          <InputForm form={form} name="description" label="Description" msg />
          <InputForm
            form={form}
            type="number"
            name="capacity"
            label="Capacity"
            msg
          />
          <InputForm form={form} name="location" label="Location" msg />
          <Button disabled={isLoading}> Submit</Button>
        </form>
      </Form>
    </>
  );
}
