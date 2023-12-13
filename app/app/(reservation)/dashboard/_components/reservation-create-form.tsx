"use client";

import z from "zod";
import { toast } from "sonner";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { SelectForm } from "@/components/forms/select";
import { InputForm } from "@/components/forms/input";
import { Button } from "@/components/ui/button";
import { createReservation } from "../_actions/create-reservation";
import { paths } from "@/schemas/api-schema";


type ReservableListGetOut = paths["/api/reservables/"]["get"]["responses"]["200"]["content"]["application/json"] 

const CreateReservationFormSchema = z.object({
    reservable_id: z.coerce.number(),
    start_time: z.coerce.date(),
    end_time: z.coerce.date(),
})

type CreateReservationFormValues = z.infer<typeof CreateReservationFormSchema>



export function CreateReservationForm(props: { setOpen: any, reservableData: ReservableListGetOut }) {
    const { reservableData } = props;
    const form = useForm<CreateReservationFormValues>({
        criteriaMode: "all",
        resolver: zodResolver(CreateReservationFormSchema),
        defaultValues: {
            reservable_id: 0,
            start_time: new Date(),
            end_time: new Date(),
        }
    })
    const options = reservableData.map((reservable, index) => {
        return {
            label: reservable.name,
            // @ts-ignore
            value: reservable.id.toString(),
        }
    })

    const handleSubmit = async (values: CreateReservationFormValues) => {
        // @ts-ignore
        values.start_time = values.start_time.toISOString()
        // @ts-ignore
        values.end_time = values.end_time.toISOString()
        // @ts-ignore
        const { data, ok, error } = await createReservation(values);
        if (ok) {
            toast.success("Reservation created")
        } else {
            toast.error(error)
        }
    }

    return (
        <>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col space-y-3">
                {/* @ts-ignore */}
                <InputForm form={form} min={new Date().toString()} name="start_time" label="Start Time" type="datetime-local" msg/>
                {/* @ts-ignore */}
                <InputForm form={form} min={new Date().toString()} name="end_time" label="End Time" type="datetime-local" msg/>
                <SelectForm form={form} name="reservable_id" label="Reservable" options={options}/>
                <Button type="submit" disabled={form.formState.isSubmitting}>Submit</Button>
            </form>
        </Form>
        </>
    )
}