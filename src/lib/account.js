"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers"; // Import cookies

export default async function accountUpdateAction({
  nickname,
  email,
  oldPassword,
  newPassword,
  confirmPassword,
}) {
  const backendUrl = "http://localhost:8080/api/auth/update";
  if (!backendUrl) {
    return { error: "Backend URL is not configured." };
  }

  // Retrieve the token from cookies
  const token = cookies().get("jwt")?.value;

  if (!token) {
    return { error: "Authentication token not found." };
  }

  try {
    const response = await fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        oldPassword: oldPassword,
        newPassword: newPassword,
        confirmPassword: confirmPassword,
        email: email,
        nickname: nickname,
      }),
      cache: "no-store",
    });
    console.log(response);

    if (!response.ok) {
      const errorText = await response.text();
      return { error: `Failed to update: ${response.status} - ${errorText}` };
    }

    const data = await response.json();
    revalidatePath("/account");

    return data;
  } catch (error) {
    return { error: "An unexpected error occurred." };
  }
}
