"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export default async function register({
  nickname,
  email,
  password,
  confirmPassword,
}) {
  console.log(nickname);
  if (!nickname || !email || !password || !confirmPassword) {
    return { error: "All fields are required." };
  }

  if (password !== confirmPassword) {
    return { error: "Passwords do not match." };
  }

  const backendUrl = "http://localhost:8080/api/auth/register";

  if (!backendUrl) {
    return { error: "Backend URL is not configured." };
  }

  try {
    const response = await fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nickname: nickname,
        username: email,
        password: password,
      }),
      cache: "no-store",
    });
    if (!response.ok) {
      const errorText = await response.text();
      // Try to parse the error for a cleaner message
      try {
        const errorJson = JSON.parse(errorText);
        return {
          error: errorJson.message || `Registration failed: ${response.status}`,
        };
      } catch {
        return {
          error: `Registration failed: ${response.status} - ${errorText}`,
        };
      }
    }

    const data = await response.json();

    revalidatePath("/admin/users");
  } catch (error) {
    console.error(error);
    return { error: "An unexpected error occurred during registration." };
  }

  redirect("/");
}
