"use client";

import * as React from "react";
import { signIn } from "next-auth/react";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import HCaptcha from "@hcaptcha/react-hcaptcha";

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  activeTab: any;
  setActiveTab: any; // Define the handleSignupPage prop
}

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters long" })
});

export default function UserAuthForm({
  className,
  activeTab,
  setActiveTab,
  ...props
}: UserAuthFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [message, setMessage] = useState('');

  const [captchaToken, setCaptchaToken] = useState(null);
  const captchaRef = useRef<any>(null);

  const handleTabChange = (value: string) => {
    setActiveTab(value);;
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onCaptchaSuccess = (token: any) => {
    setCaptchaToken(token);

    // Retrieve current form values
    const formValues = form.getValues();
    const email = formValues.email;
    const password = formValues.password;

    // Proceed with either login or registration after captcha success
    if (activeTab === 'login') {
      login(email, password);
    } else {
      register(email, password);
    }

    setIsLoading(false);
  };

  const onCaptchaError = (error: any) => {
    console.error('Captcha error:', error);
    setIsLoading(false);
    // Handle any additional error logic here
  };

  const onCaptchaExpire = () => {
    console.log('Captcha expired');
    setIsLoading(false);
    // Handle any additional expiration logic here
  };

  /* async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    await signIn("email", { email });

    setIsLoading(false);
  } */

  const onSubmit = async (values: any) => {
    const { email, password } = values;

    // Trigger captcha execution for both login and registration
    if (captchaRef.current) {
      await captchaRef.current.execute();
    } else {
      console.error('Captcha not available');
    }
  };

  async function login(email: string, password: string) {
    setIsLoading(true);
    console.log('Login with:', email);

    const user = await signIn('credentials', {
      redirect: false,
      email,
      password,
      isSignUp: false,
    });

    setIsLoading(false);
  }

  async function register(email: string, password: string) {
    setIsLoading(true);
    console.log('Register with:', email);

    const user = await signIn('credentials', {
      redirect: false,
      email,
      password,
      isSignUp: true,
    });
    if(user){
      // auto login after signup
      await signIn('credentials', {
        redirect: false,
        email,
        password,
        isSignUp: false,
      });
    }

    setIsLoading(false);
  }

  const handleSignInWithGoogle = async () => {
    setIsLoading(true);
    await signIn("google");
  };

  const handleSignInWithGitHub = async () => {
    setIsLoading(true);
    await signIn("github");
  };

  const handleSignInWithLinkedin = async () => {
    setIsLoading(true);
    await signIn("linkedin");
  };


  return (
    <>
    <div className={cn("grid gap-6", className)} {...props}>
      <Tabs defaultValue="register">
        <TabsList>
          <TabsTrigger value="register" className="w-44" onClick={() => handleTabChange('register')}>Register</TabsTrigger>
          <TabsTrigger value="login" className="w-44" onClick={() => handleTabChange('login')}>Login</TabsTrigger>
        </TabsList>
        <TabsContent value="register">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-2">
                <div className="grid gap-1">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                        {/* <FormLabel>Email</FormLabel> */}
                        <Input
                          id="email"
                          placeholder="name@example.com"
                          type="email"
                          autoCapitalize="none"
                          autoComplete="email"
                          autoCorrect="off"
                          disabled={isLoading}
                          {...field}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-1">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        {/* <FormLabel>Password</FormLabel> */}
                        <Input
                          id="password"
                          placeholder="Enter your password"
                          type="password"
                          autoCapitalize="none"
                          autoComplete="current-password"
                          autoCorrect="off"
                          disabled={isLoading}
                          {...field}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button disabled={isLoading}>
                  {isLoading && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Register with Email
                </Button>
              </div>
            </form>
          </Form>
        </TabsContent>
        <TabsContent value="login">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-2">
                <div className="grid gap-1">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        {/* <FormLabel>Email</FormLabel> */}
                        <Input
                          id="email"
                          placeholder="name@example.com"
                          type="email"
                          autoCapitalize="none"
                          autoComplete="email"
                          autoCorrect="off"
                          disabled={isLoading}
                          {...field}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="grid gap-1">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        {/* <FormLabel>Password</FormLabel> */}
                        <Input
                          id="password"
                          placeholder="Enter your password"
                          type="password"
                          autoCapitalize="none"
                          autoComplete="current-password"
                          autoCorrect="off"
                          disabled={isLoading}
                          {...field}
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button disabled={isLoading}>
                  {isLoading && (
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Login with Email
                </Button>
              </div>
            </form>
          </Form>
        </TabsContent>
      </Tabs>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button
        variant="outline"
        type="button"
        disabled={isLoading}
        onClick={handleSignInWithGitHub}
      >
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.gitHub className="mr-2 h-4 w-4" />
        )}{" "}
        Github
      </Button>
      <Button
        variant="outline"
        type="button"
        disabled={isLoading}
        onClick={handleSignInWithGoogle}
        className="-mt-4"
      >
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.google className="mr-2 h-4 w-4" />
        )}{" "}
        Google
      </Button>
      <Button
        variant="outline"
        type="button"
        disabled={isLoading}
        onClick={handleSignInWithLinkedin}
        className="-mt-4"
      >
        {isLoading ? (
          <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Icons.linkedIn className="mr-2 h-4 w-4" />
        )}{" "}
        Linkedin
      </Button>
    </div>
    <div className="hidden">
      <HCaptcha
        sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY as string}
        onVerify={onCaptchaSuccess}
        onError={onCaptchaError}
        onExpire={onCaptchaExpire}
        size="invisible"
        ref={captchaRef}
      />
    </div>
  </>
  );
}
