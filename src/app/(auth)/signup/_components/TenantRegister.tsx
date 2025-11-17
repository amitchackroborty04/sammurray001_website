"use client";

import * as React from "react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";

type FormData = {
  fullName: string;
  email: string;
  role: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
};

export default function TenantRegister() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const form = useForm<FormData>({
    defaultValues: {
      fullName: "",
      email: "",
      role: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: false,
    },
  });

  // ✅ Business registration mutation
  const businessRegistrationMutation = useMutation({
    mutationFn: async (data: FormData) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Registration failed");
      }

      return res.json();
    },
    onSuccess: (data) => {
      toast.success(
        data.message || "Registration successful! Please check your email."
      );
      form.reset();
      router.push("/login");
    },
    onError: (error) => {
      toast.error(
        `❌ Registration failed: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    },
  });

  const onSubmit = (data: FormData) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    businessRegistrationMutation.mutate(data);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full">
        <Card className="bg-slate-800 border-slate-700 shadow-2xl">
          <CardContent className="pt-8 pb-6">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-cyan-400 mb-2">
                Create Your Account
              </h1>
              <p className="text-slate-400 text-sm">Register a new account</p>
            </div>

            <div className="space-y-4">
              <FieldGroup>
                {/* Full Name */}
                <Controller
                  name="fullName"
                  control={form.control}
                  rules={{ required: "Full Name is required" }}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel className="text-slate-300 text-sm font-normal">
                        Full Name
                      </FieldLabel>
                      <Input
                        {...field}
                        placeholder="Name Here"
                        className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500 focus:border-cyan-500 focus:ring-cyan-500"
                      />
                      {fieldState.error && (
                        <FieldError
                          errors={[fieldState.error]}
                          className="text-red-400 text-xs"
                        />
                      )}
                    </Field>
                  )}
                />

                {/* Email */}
                <Controller
                  name="email"
                  control={form.control}
                  rules={{ required: "Email is required" }}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel className="text-slate-300 text-sm font-normal">
                        Email Address
                      </FieldLabel>
                      <Input
                        {...field}
                        type="email"
                        placeholder="hello@example.com"
                        className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500 focus:border-cyan-500 focus:ring-cyan-500"
                      />
                      {fieldState.error && (
                        <FieldError
                          errors={[fieldState.error]}
                          className="text-red-400 text-xs"
                        />
                      )}
                    </Field>
                  )}
                />

                {/* Role */}
                <Controller
                  name="role"
                  control={form.control}
                  rules={{ required: "Role is required" }}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel className="text-slate-300 text-sm font-normal">
                        Role
                      </FieldLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="bg-slate-700 border-slate-600 text-white focus:border-cyan-500 focus:ring-cyan-500">
                          <SelectValue placeholder="Select Role" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-700 border-slate-600">
                          <SelectItem
                            value="TENANT"
                            className="text-white hover:bg-slate-600"
                          >
                            Tenant
                          </SelectItem>
                          {/* <SelectItem
                            value="SUPPLIER"
                            className="text-white hover:bg-slate-600"
                          >
                            Supplier
                          </SelectItem> */}
                        </SelectContent>
                      </Select>
                      {fieldState.error && (
                        <FieldError
                          errors={[fieldState.error]}
                          className="text-red-400 text-xs"
                        />
                      )}
                    </Field>
                  )}
                />

                {/* Password */}
                <Controller
                  name="password"
                  control={form.control}
                  rules={{ required: "Password is required" }}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel className="text-slate-300 text-sm font-normal">
                        Password
                      </FieldLabel>
                      <div className="relative">
                        <Input
                          {...field}
                          type={showPassword ? "text" : "password"}
                          placeholder="********"
                          className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500 focus:border-cyan-500 focus:ring-cyan-500 pr-12"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                        >
                          {showPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                      {fieldState.error && (
                        <FieldError
                          errors={[fieldState.error]}
                          className="text-red-400 text-xs"
                        />
                      )}
                    </Field>
                  )}
                />

                {/* Confirm Password */}
                <Controller
                  name="confirmPassword"
                  control={form.control}
                  rules={{ required: "Confirm Password is required" }}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel className="text-slate-300 text-sm font-normal">
                        Confirm Password
                      </FieldLabel>
                      <div className="relative">
                        <Input
                          {...field}
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="********"
                          className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-500 focus:border-cyan-500 focus:ring-cyan-500 pr-12"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                      {fieldState.error && (
                        <FieldError
                          errors={[fieldState.error]}
                          className="text-red-400 text-xs"
                        />
                      )}
                    </Field>
                  )}
                />

                {/* Licensed Agency Checkbox */}
                <Controller
                  name="agreeToTerms"
                  control={form.control}
                  rules={{ required: true }}
                  render={({ field }) => (
                    <div className="flex items-center gap-2 mt-2">
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        onBlur={field.onBlur}
                        name={field.name}
                        ref={field.ref}
                        className="border-slate-600 data-[state=checked]:bg-cyan-500 data-[state=checked]:border-cyan-500"
                      />
                      <span className="text-sm text-slate-400">
                        Licensed Agency
                      </span>
                    </div>
                  )}
                />
              </FieldGroup>

              <CardFooter className="flex flex-col gap-4 px-0 pb-0 pt-4">
                <Button
                  onClick={form.handleSubmit(onSubmit)}
                  className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-6 rounded-md transition-colors"
                  disabled={businessRegistrationMutation.isPending}
                >
                  {businessRegistrationMutation.isPending
                    ? "Signing Up..."
                    : "Sign Up"}
                </Button>

                <div className="text-center text-sm text-slate-400">
                  Already have an account?{" "}
                  <Link href="/signin">
                    <span className="text-cyan-400 cursor-pointer hover:underline font-medium">
                      Log In
                    </span>
                  </Link>
                </div>
              </CardFooter>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
