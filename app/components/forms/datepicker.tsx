"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import DatePicker from "react-datepicker";
import { es } from "date-fns/locale";
import React from "react";
import "react-datepicker/dist/react-datepicker.css";

type IDateFormProps = {
  label: string;
  name: string;
  className?: string;
  isRequired?: boolean;
  form: any;
  locale?: Locale;
  placeholder?: string;
};

export function DateInputForm(props: IDateFormProps) {
  const {
    label,
    name,
    className,
    isRequired,
    form,
    locale = es,
    placeholder,
    ...rest
  } = props;
  const [startDate, setStartDate] = React.useState(new Date());
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>
            {label}
            {isRequired && <span className="text-destructive"> *</span>}
          </FormLabel>
          <FormControl>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date as Date)}
              locale={locale}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
