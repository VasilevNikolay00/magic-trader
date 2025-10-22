export async function cardRequest(params) {
  const backendUrl = "http://localhost:8080/api/cards"; // Get the base URL from environment
  if (!backendUrl) {
    console.error("Environment variable BACKEND_CARDS is not set.");
    throw new Error("Backend URL is not configured.");
  }

  const requestUrl = `${backendUrl}`; // Combine base URL with parameters
  console.log("Making request to:", requestUrl);

  try {
    const response = await fetch(requestUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text(); // Get raw text for better error logging
      console.error(
        `HTTP error! status: ${response.status}, message: ${errorText}`
      );
      throw new Error(
        `Failed to fetch data: ${response.status} - ${errorText}`
      );
    }

    const data = await response.json();
    return JSON.parse(data);
  } catch (error) {
    console.error("Error during cardRequest:", error);
    throw error;
  }
}
