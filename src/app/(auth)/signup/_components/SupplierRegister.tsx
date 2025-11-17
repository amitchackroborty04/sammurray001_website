"use client";

import * as React from "react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Eye, EyeOff, Upload } from "lucide-react";
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

// ✔ Rename to avoid conflict with browser FormData
type FormFields = {
  fullName: string;
  email: string;
  role: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
  agencyName: string;
  location: string;
  phone: string;
  bio: string;
};

export default function SupplierRegister() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [licenseFile, setLicenseFile] = useState<File | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);

  const [licenseFileName, setLicenseFileName] = useState("");
  const [logoFileName, setLogoFileName] = useState("");

  const router = useRouter();

  const form = useForm<FormFields>({
    defaultValues: {
      fullName: "",
      email: "",
      role: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: false,
      agencyName: "",
      location: "",
      phone: "",
      bio: "",
    },
  });

  // -------------------------
  //      MUTATION FIXED
  // -------------------------
  const salesRegistrationMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/register`,
        {
          method: "POST",
          body: formData, // ✔ Works now
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
      setLicenseFile(null);
      setLogoFile(null);
      setLicenseFileName("");
      setLogoFileName("");
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

  // -------------------------
  //      SUBMIT HANDLER
  // -------------------------
  const onSubmit = (values: FormFields) => {
    if (values.password !== values.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    // ✔ Create FormData correctly
    const submitFormData = new FormData();

    // ✔ Append files
    if (licenseFile) submitFormData.append("licenseImage", licenseFile);
    if (logoFile) submitFormData.append("logoImage", logoFile);

    // ✔ Append text fields
    submitFormData.append("fullName", values.fullName);
    submitFormData.append("email", values.email);
    submitFormData.append("role", values.role);
    submitFormData.append("password", values.password);
    submitFormData.append("agencyName", values.agencyName);
    submitFormData.append("location", values.location);
    submitFormData.append("phone", values.phone);
    submitFormData.append("bio", values.bio);

    // ✔ Send to mutation
    salesRegistrationMutation.mutate(submitFormData);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full">
        <Card className="bg-slate-800 border-slate-700 shadow-2xl">
          <CardContent className="pb-6 pt-4">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-cyan-400 mb-2">
                Create Your Account
              </h1>
              <p className="text-slate-400 text-sm">Register a new account</p>
            </div>

            {/* SCROLL AREA */}
            <div className="max-h-[550px] overflow-y-auto pr-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
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
                          className="bg-slate-700 border-slate-600 text-white"
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
                    rules={{
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    }}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel className="text-slate-300 text-sm font-normal">
                          Email
                        </FieldLabel>
                        <Input
                          {...field}
                          placeholder="hello@example.com"
                          className="bg-slate-700 border-slate-600 text-white"
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
                          <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                            <SelectValue placeholder="Select Role" />
                          </SelectTrigger>
                          <SelectContent className="bg-slate-700 border-slate-600">
                            <SelectItem
                              value="SUPPLIER"
                              className="text-white hover:bg-slate-600"
                            >
                              Supplier
                            </SelectItem>
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
                            className="bg-slate-700 border-slate-600 text-white pr-12"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
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
                            className="bg-slate-700 border-slate-600 text-white pr-12"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
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

                  {/* Agency Name */}
                  <Controller
                    name="agencyName"
                    control={form.control}
                    rules={{ required: "Agency Name is required" }}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel className="text-slate-300 text-sm font-normal">
                          Agency Name
                        </FieldLabel>
                        <Input
                          {...field}
                          placeholder="Name Here"
                          className="bg-slate-700 border-slate-600 text-white"
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

                  {/* Location */}
                  <Controller
                    name="location"
                    control={form.control}
                    rules={{ required: "Location is required" }}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel className="text-slate-300 text-sm font-normal">
                          Location
                        </FieldLabel>
                        <Input
                          {...field}
                          placeholder="Write Here"
                          className="bg-slate-700 border-slate-600 text-white"
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

                  {/* Phone */}
                  <Controller
                    name="phone"
                    control={form.control}
                    rules={{ required: "Phone is required" }}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel className="text-slate-300 text-sm font-normal">
                          Phone
                        </FieldLabel>
                        <Input
                          {...field}
                          placeholder="+88017..."
                          className="bg-slate-700 border-slate-600 text-white"
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

                  {/* License Upload */}
                  <Field>
                    <FieldLabel className="text-slate-300 text-sm font-normal">
                      License (optional)
                    </FieldLabel>
                    <div className="relative">
                      <input
                        type="file"
                        id="license-upload"
                        onChange={(e) => {
                          const file = e.target.files?.[0] || null;
                          setLicenseFile(file);
                          setLicenseFileName(file?.name || "");
                        }}
                        className="hidden"
                        accept="image/*,.pdf"
                      />
                      <label
                        htmlFor="license-upload"
                        className="flex flex-col items-center justify-center h-24 bg-slate-700 border-2 border-dashed border-slate-600 rounded-md cursor-pointer hover:border-cyan-500"
                      >
                        <Upload className="w-6 h-6 text-slate-400 mb-1" />
                        <span className="text-sm text-slate-400">
                          {licenseFileName || "Upload"}
                        </span>
                      </label>
                    </div>
                  </Field>

                  {/* Logo Upload */}
                  <Field>
                    <FieldLabel className="text-slate-300 text-sm font-normal">
                      Logo (optional)
                    </FieldLabel>
                    <div className="relative">
                      <input
                        type="file"
                        id="logo-upload"
                        onChange={(e) => {
                          const file = e.target.files?.[0] || null;
                          setLogoFile(file);
                          setLogoFileName(file?.name || "");
                        }}
                        className="hidden"
                        accept="image/*"
                      />
                      <label
                        htmlFor="logo-upload"
                        className="flex flex-col items-center justify-center h-24 bg-slate-700 border-2 border-dashed border-slate-600 rounded-md cursor-pointer hover:border-cyan-500"
                      >
                        <Upload className="w-6 h-6 text-slate-400 mb-1" />
                        <span className="text-sm text-slate-400">
                          {logoFileName || "Upload"}
                        </span>
                      </label>
                    </div>
                  </Field>

                  {/* Bio */}
                  <Controller
                    name="bio"
                    control={form.control}
                    rules={{ required: "Bio is required" }}
                    render={({ field, fieldState }) => (
                      <Field data-invalid={fieldState.invalid}>
                        <FieldLabel className="text-slate-300 text-sm font-normal">
                          Bio
                        </FieldLabel>
                        <textarea
                          {...field}
                          placeholder="Write Here"
                          rows={4}
                          className="w-full bg-slate-700 border border-slate-600 text-white rounded-md px-3 py-2 resize-none"
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

                  {/* Terms & Conditions */}
                  <Controller
                    name="agreeToTerms"
                    control={form.control}
                    rules={{
                      required: "You must agree to the terms",
                    }}
                    render={({ field, fieldState }) => (
                      <div>
                        <div className="flex items-start gap-2 mt-3">
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="border-slate-600 data-[state=checked]:bg-cyan-500"
                          />
                          <label
                            className="text-sm text-slate-400 cursor-pointer"
                            onClick={() => field.onChange(!field.value)}
                          >
                            I agree to the{" "}
                            <span className="text-cyan-400 hover:underline">
                              terms & conditions
                            </span>
                          </label>
                        </div>
                        {fieldState.error && (
                          <p className="text-sm text-red-400 mt-1">
                            {fieldState.error.message}
                          </p>
                        )}
                      </div>
                    )}
                  />
                </FieldGroup>
              </div>
            </div>

            {/* Footer */}
            <CardFooter className="flex flex-col gap-4 px-0 pb-0 pt-6">
              <Button
                onClick={form.handleSubmit(onSubmit)}
                className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-6 rounded-md"
                disabled={salesRegistrationMutation.isPending}
              >
                {salesRegistrationMutation.isPending
                  ? "Registering..."
                  : "Register"}
              </Button>

              <div className="text-center text-sm text-slate-400">
                Already have an account?{" "}
                <Link href="/signin">
                  <span className="text-cyan-400 hover:underline font-medium">
                    Log In
                  </span>
                </Link>
              </div>
            </CardFooter>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
