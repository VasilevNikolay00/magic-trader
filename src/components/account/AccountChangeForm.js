"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import account from "@/lib/account";

export default function AccountChangeForm() {
  // Use a single state object to hold all form data
  const [formData, setFormData] = useState({
    nickname: "",
    email: "",
    newPassword: "",
    confirmPassword: "",
    oldPassword: "",
    confirmPassword: "",
  });
  const router = useRouter();
  // A single handler to update the state for any input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle the form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // The backend will handle validation and password confirmation,
    // so we typically don't send the `confirmPassword` field.
    const submissionData = {
      nickname: formData.nickname,
      email: formData.email,
      oldPassword: formData.oldPassword,
      newPassword: formData.newPassword,
      confirmPassword: formData.confirmPassword,
    };
    account(submissionData);
    router.refresh();
  };

  return (
    <div className="bg-card/50 w-full h-full backdrop-blur-xl rounded-xl p-4">
      <div className="bg-accent/50 w-full h-full flex flex-col rounded-xl p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Nickname Field */}
          <div className="space-y-2">
            <Label htmlFor="nickname">Nickname</Label>
            <Input
              id="nickname"
              name="nickname"
              value={formData.nickname}
              onChange={handleChange}
              placeholder="Your nickname"
              className="h-12"
            />
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your email"
              className="h-12"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="oldPassword">Enter Current Password</Label>
            <Input
              id="oldPassword"
              name="oldPassword"
              type="password"
              value={formData.oldPassword}
              onChange={handleChange}
              placeholder="Current Password"
              className="h-12"
            />
          </div>
          {/* New Password Field */}
          <div className="space-y-2">
            <Label htmlFor="password">New Password</Label>
            <Input
              id="newPassword"
              name="newPassword"
              type="password"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="New password"
              className="h-12"
            />
          </div>

          {/* Confirm New Password Field */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm new password"
              className="h-12"
            />
          </div>

          <Button type="submit">Update account</Button>
        </form>
      </div>
    </div>
  );
}
