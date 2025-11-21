"use client";

import { useState } from "react";
import register from "@/lib/register"; // Your server action
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    nickname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const [apiError, setApiError] = useState(null);

  const [isPending, setIsPending] = useState(false);

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: null,
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nickname.trim()) {
      newErrors.nickname = "Nickname is required.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email address is invalid.";
    }

    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    return newErrors;
  };

  // This function is called when the form's submit button is clicked.
  const handleSubmit = async (e) => {
    // Prevents the default browser behavior of reloading the page on form submission.
    e.preventDefault();

    // Clear any previous errors from the server.
    setApiError(null);

    // Run the client-side validation function.
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      // Stop the submission if there are validation errors.
      return;
    }

    // Set the loading state to true to disable the button and show a spinner.
    setIsPending(true);

    // Prepare the data to be sent to the server. Note we exclude 'confirmPassword'.
    const submissionData = {
      nickname: formData.nickname,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    };

    // **CRITICAL DEBUGGING STEP**: Log the data you are about to send.
    // Check your browser's developer console (F12) to see this output.
    console.log("Data being sent to the server:", submissionData);

    try {
      // Call the server action and wait for the result.
      const result = await register(submissionData);

      // Check if the server action returned an object with an 'error' property.
      if (result?.error) {
        setApiError(result.error);
        console.error("Server returned an error:", result.error);
      } else {
        // If successful, redirect the user.
        router.push("/dashboard");
        router.refresh();
      }
    } catch (err) {
      // Catch any unexpected errors during the server action call.
      setApiError("An unexpected error occurred. Please try again.");
      console.error("An unexpected error occurred during submission:", err);
    } finally {
      // Whether successful or not, always set the loading state back to false.
      setIsPending(false);
    }
  };

  return (
    // The JSX remains the same as in your original code.
    <Card className="w-full max-w-md bg-card/60 backdrop-blur-xl border-white/20">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Create an Account</CardTitle>
        <CardDescription>
          Enter your details below to get started.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nickname Input */}
          <div className="space-y-2">
            <Label htmlFor="nickname">Nickname</Label>
            <Input
              id="nickname"
              name="nickname"
              type="text"
              placeholder="Your display name"
              value={formData.nickname}
              onChange={handleChange}
              className={errors.nickname ? "border-red-500" : ""}
            />
            {errors.nickname && (
              <p className="text-sm text-red-500">{errors.nickname}</p>
            )}
          </div>

          {/* Email Input */}
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="name@example.com"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
            )}
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? "border-red-500" : ""}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password Input */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="••••••••"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={errors.confirmPassword ? "border-red-500" : ""}
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-500">{errors.confirmPassword}</p>
            )}
          </div>

          {/* Display API/Server Error */}
          {apiError && (
            <p className="text-sm text-red-500 bg-red-100/10 p-3 rounded-md text-center">
              {apiError}
            </p>
          )}

          {/* Submit Button */}
          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating Account...
              </>
            ) : (
              "Create Account"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
