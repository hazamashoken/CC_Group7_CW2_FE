"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import Link from "next/link";
import {CardContent,CardFooter} from "@/components/ui/card"
import { InputForm } from "@/components/forms/input";
import { TUserPostIn, signupAction } from "../_actions/signup-action";
import { useTransition } from "react";
import { cn } from "@/lib/utils";
import { Eye, EyeOff, Loader2Icon } from "lucide-react";
import React from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const signupSchema = z.object({
  username: z.string(),
  password: z.string(),
  email: z.string(),
  first_name: z.string(),
  last_name: z.string(),
})


type TSignUpForm = z.infer<typeof signupSchema>;

export function SignUpForm(
  props: React.HTMLAttributes<HTMLDivElement>
): JSX.Element {
  const { className } = props;
  const router = useRouter();
  const [pending, startTransaction] = useTransition();
  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const form = useForm({
    criteriaMode: "all",
    resolver: zodResolver(signupSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      username: ""
    },
  });

  const onSubmit = (values: TSignUpForm) => {
    startTransaction(async () => {
      const payload: TUserPostIn = {
        email: values.email,
        password: values.password,
        first_name: values.first_name,
        last_name: values.last_name,
        username: values.username
      };
      const res = await signupAction(payload);
      if (res.ok) {
        toast.success(
            "Successfully sign up"
        );
        router.push("/login");
      } else {
        toast.error("Error");
      }
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn(
          "flex flex-col items-center justify-center gap-4",
          className
        )}
      >
      <CardContent className="grid gap-4">
        <div className="grid w-full grid-cols-2 gap-3 sm:grid-cols-10">
          <InputForm
            label="First Name"
            name="first_name"
            form={form}
            className="col-span-4"
            isRequired
          />
          <InputForm
            label="Last Name"
            name="last_name"
            form={form}
            className="col-span-4"
            isRequired
          />
          <InputForm
            label="Email"
            name="email"
            form={form}
            className="col-span-5"
            isRequired
          />
          <InputForm
            label="Username"
            name="username"
            form={form}
            className="col-span-5"
            isRequired
          />
          <div className="col-span-5" />
          <InputForm
            label="Password"
            name="password"
            form={form}
            className="col-span-4"
            isRequired
            type={showPassword ? "text" : "password"}
          />

          <div
            onClick={() => setShowPassword((prev) => !prev)}
            className="relative self-end col-span-1 bottom-2"
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </div>
        </div>
        </CardContent>
        <CardFooter className="flex flex-col">
        <div className="grid grid-cols-2 gap-3 mt-2">
        <Link href="/login" className="w-full" prefetch={false}>
              <Button
                variant={"outline"}
                className="w-full rounded-xl"
                disabled={isLoading}
              >
                Back
              </Button>
        </Link>
        <Button
          type="submit"
          className="self-center"
          disabled={pending}
        >
          {pending && (
            <Loader2Icon className="mr-2 animate-spin" size={16} />
          )}
          Sign Up
        </Button>
      </div>
      </CardFooter>
      </form>
    </Form>
  );
}