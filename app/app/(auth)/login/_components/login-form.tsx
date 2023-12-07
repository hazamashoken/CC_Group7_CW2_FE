"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { signIn, SignInResponse } from "next-auth/react";
import Link from "next/link";
import React from "react";
import z from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {CardContent,CardFooter} from "@/components/ui/card"
import { toast,Toaster } from "sonner";
import { InputForm } from "@/components/forms/input";
import { Loader2Icon } from "lucide-react";

export const loginSchema = z.object({
  username: z.string().min(1, { message: "Username cannot be empty" }),
  password: z.string().min(1, { message: "Password cannot be empty" }),
});

export type ILogin = z.infer<typeof loginSchema>;

export function LoginForm(
  props: React.HTMLAttributes<HTMLDivElement>
): JSX.Element {
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function onSubmit(values: ILogin) {
    setIsLoading(true);

    signIn("credentials", {
      email: values.username,
      password: values.password,
      redirect: false,
    }).then((res: SignInResponse | undefined) => {
      const { ok, error } = res as any;
      if (ok) {
        toast.success("Login success");
        router.push("/dashboard");
        form.reset();
        router.refresh();
      } else {
        toast.error("Login failed", {
          description: "Please check your username and password",
        });
      }
      setIsLoading(false);
    });
  }
  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-3 text-muted">
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
            <InputForm
              label="Username"
              name="username"
              form={form}
              className="col-span-5"
              placeholder="username@email.com"
              isRequired
            />
            </div>
           <div className="grid gap-2">
              <InputForm
                label="Password"
                name="password"
                placeholder="********"
                form={form}
                type={"password"}
                isRequired
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
          <div className="grid grid-cols-2 gap-3 mt-2">
          <Toaster />
            <Button
              type="submit"
              className="rounded-xl"
              disabled={isLoading}
            >
            {isLoading && (
              <Loader2Icon className="mr-2 animate-spin" size={16} />
            )}
              Login
            </Button>
            <Link href="/signup" className="w-full" prefetch={false}>
            <Toaster />
              <Button
                variant={"outline"}
                className="w-full rounded-xl"
                disabled={isLoading}
              >
                Sign Up
              </Button>
            </Link>
          </div>
          </CardFooter>
        </form>
      </Form>
    </>
  );
}
