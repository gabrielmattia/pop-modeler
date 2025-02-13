"use client";

import { Card, CardHeader, CardTitle } from "~/components/ui/card";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import {
  type UserSignIn,
  userSignInSchema,
  type UserSignUp,
  userSignUpSchema,
} from "~/lib/types/user";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { createUser } from "~/server/actions";
import { Toaster } from "~/components/ui/toaster";
import { useToast } from "~/hooks/use-toast";
import Signup from "./signup";
import Signin from "./signin";

export default function Login() {
  const [activeTab, setActiveTab] = useState<"sign-up" | "sign-in">("sign-in");
  const { toast } = useToast();

  const signInForm = useForm<UserSignIn>({
    resolver: zodResolver(userSignInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
  });

  const onSubmitSignIn = async (data: UserSignIn) => {
    console.log("sign in", data);
  };

  const signUpForm = useForm<UserSignUp>({
    resolver: zodResolver(userSignUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onSubmit",
  });

  const onSubmitSignUp = async (data: UserSignUp) => {
    const result = await createUser(data);
    if (result.success) {
      signUpForm.reset();
      signInForm.setValue("email", data.email);
      setActiveTab("sign-in");
      toast({
        title: "Create: Succefuly",
        description: "User succefuly created",
      });
    }

    if (result.error) {
      signUpForm.setError("email", { message: result.error });
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Tabs
        defaultValue={activeTab}
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as "sign-up" | "sign-in")}
        className="w-[400px]"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="sign-in">Sign in</TabsTrigger>
          <TabsTrigger value="sign-up">Sign up</TabsTrigger>
        </TabsList>
        <TabsContent value="sign-in">
          <Card>
            <CardHeader>
              <CardTitle>Sign in</CardTitle>
            </CardHeader>
            <FormProvider {...signInForm}>
              <Signin form={signInForm} onSubmit={onSubmitSignIn} />
            </FormProvider>
          </Card>
        </TabsContent>
        <TabsContent value="sign-up">
          <Card>
            <CardHeader>
              <CardTitle>Sign up</CardTitle>
            </CardHeader>
            <FormProvider {...signUpForm}>
              <Signup form={signUpForm} onSubmit={onSubmitSignUp} />
            </FormProvider>
          </Card>
        </TabsContent>
      </Tabs>
      <Toaster />
    </main>
  );
}
