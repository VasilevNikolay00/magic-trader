"use server";

import { cookies } from "next/headers";

export async function addToCollection({ cardId, quantity }) {
  const backendUrl = "http://localhost:8080/api/collection/";
  if (!backendUrl) {
    throw new Error("Backend URL is not configured.");
  }

  const cookieStore = await cookies();
  const tokenCookie = cookieStore.get("jwt");

  if (!tokenCookie) {
    throw new Error("User not authenticated.");
  }

  const token = tokenCookie.value;

  try {
    const response = await fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        cardId: cardId,
        quantity: quantity,
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      const errorText = await response.text();
      // It's helpful to return the error message for the client to display
      throw new Error(`API Error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    return { data }; // Or just return data
  } catch (error) {
    console.error("Error in addToCollection:", error.message);
    // Re-throw so the client's .catch() can handle it
    throw error;
  }
}
