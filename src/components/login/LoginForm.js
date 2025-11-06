"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Correct import for App Router
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import Link from "next/link";
import login from "@/lib/login";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State to hold error messages
  const [isLoading, setIsLoading] = useState(false); // State to handle loading UI
  const router = useRouter(); // Hook for navigation

  const handleSubmit = async () => {
    setIsLoading(true); // Disable the button and show loading state
    setError(""); // Clear previous errors

    try {
      // Await the result of the login function
      const data = await login(email, password);

      console.log("Login successful:", data);
      router.push("/account"); // Redirect to a protected page.
    } catch (error) {
      console.error("Login failed:", error);
      setError("Invalid email or password. Please try again."); // Set a user-friendly error message
    } finally {
      setIsLoading(false); // Re-enable the button
    }
  };

  return (
    <div className="w-full max-w-md p-8 space-y-6 bg-card rounded-2xl shadow-lg">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Welcome Back!</h1>
        <p className="text-muted-foreground">
          Enter your credentials to access your account
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="example@email.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <Input
            id="password"
            type="password"
            placeholder="*******"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
        </div>
      </div>

      {error && <p className="text-sm text-red-500 text-center">{error}</p>}

      <Button
        type="submit"
        className="w-full"
        onClick={handleSubmit}
        disabled={isLoading}
      >
        {isLoading ? "Signing In..." : "Sign In"}
      </Button>
    </div>
  );
}
