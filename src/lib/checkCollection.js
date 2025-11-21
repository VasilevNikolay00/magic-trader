"use server";
import { cookies } from "next/headers"; // Import cookies

export async function checkCollection(id) {
  const backendUrl = "http://localhost:8080/api/collection";
  if (!backendUrl) {
    console.error("Environment variable BACKEND_CARDS is not set.");
    throw new Error("Backend URL is not configured.");
  }

  const cookie = await cookies();
  const token = cookie.get("jwt")?.value;
  const requestUrl = `${backendUrl}/${id}`;

  try {
    const response = await fetch(requestUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      if (
        response.status === 404 || // Not Found: The card isn't in the collection
        response.status === 401 || // Unauthorized: Token is invalid or expired
        response.status === 403 // Forbidden: Token is valid but user lacks permissions
      ) {
        console.log(
          `Received status ${response.status}. Returning default quantity.`
        );
        return { data: { quantity: 0 } };
      }
    }

    const data = await response.json();

    return {
      data,
    };
  } catch (error) {
    throw error;
  }
}
