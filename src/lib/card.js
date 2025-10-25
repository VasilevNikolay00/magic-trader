export async function card(id) {
  const backendUrl = "http://localhost:8080/api/cards";
  if (!backendUrl) {
    console.error("Environment variable BACKEND_CARDS is not set.");
    throw new Error("Backend URL is not configured.");
  }

  const requestUrl = `${backendUrl}/${id}`;
  console.log(requestUrl);

  try {
    const response = await fetch(requestUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    // if (!response.ok) {
    //   const errorText = await response.text();
    //   console.error(
    //     `HTTP error! status: ${response.status}, message: ${errorText}`
    //   );
    //   throw new Error(
    //     `Failed to fetch data: ${response.status} - ${errorText}`
    //   );
    // }

    const data = await response.json();

    return {
      data,
    };
  } catch (error) {
    console.error("Error during cardRequest:", error);
    throw error;
  }
}
