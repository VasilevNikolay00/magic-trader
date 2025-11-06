"use server";

import { cookies } from "next/headers";
import { parse } from "cookie";

export default async function login(email, password) {
  const backendUrl = "http://localhost:8080/api/auth/login";
  const cookie = await cookies();
  if (!backendUrl) {
    throw new Error("Backend URL is not configured.");
  }

  try {
    const response = await fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: email,
        password: password,
      }),
      cache: "no-store",
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to fetch data: ${response.status} - ${errorText}`
      );
    }

    const setCookieHeader = response.headers.get("set-cookie");

    if (setCookieHeader) {
      const parsedCookie = parse(setCookieHeader);
      const { jwt, ...options } = parsedCookie;

      cookie.set("jwt", jwt, {
        httpOnly: true,
        path: options.Path,
        maxAge: Number(options["Max-Age"]),
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
      });
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
