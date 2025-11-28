import { cookies } from "next/headers";

export async function getCollection(params = {}) {
  const backendUrl = "http://localhost:8080/api/collection";
  const requestUrl = `${backendUrl}/`;

  const cookieStore = await cookies();
  const token = cookieStore.get("jwt")?.value;

  if (!token) {
    throw new Error("Missing JWT token");
  }

  const queryParams = new URLSearchParams();
  const page = params.page ? parseInt(params.page, 10) : 0;
  const size = params.size ? parseInt(params.size, 10) : 20;

  
  queryParams.append("page", page.toString());
  queryParams.append("size", size.toString());

  for (const key in params) {
    if (key !== "page" && key !== "size" && params[key] != null) {
      queryParams.append(key, params[key].toString());
    }
  }

  const finalUrl = `${requestUrl}?${queryParams.toString()}`;
  console.log("Making request to:", finalUrl);

  try {
    const response = await fetch(finalUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch data: ${response.status} - ${errorText}`);
    }

    return { data: await response.json() };

  } catch (error) {
    console.error("Error during cardRequest:", error);
    throw error;
  }
}

