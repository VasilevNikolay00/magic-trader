"use server";

import { cookies } from "next/headers";
import { jwtVerify } from "jose";

const secretString = process.env.JWT_SECRET;
const secret = Buffer.from(secretString, "base64");

export async function getAuthenticatedUser() {
  const cookieStore = await cookies();
  const cookieValue = cookieStore.get("jwt");

  if (!cookieValue) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(cookieValue.value, secret);
    return payload;
  } catch (error) {
    console.error(
      "JWT Verification failed in getAuthenticatedUser:",
      error.message
    );
    return null;
  }
}
