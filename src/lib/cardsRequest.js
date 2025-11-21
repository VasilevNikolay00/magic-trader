export async function cardsRequest(params = {}) {
  const backendUrl = "http://localhost:8080/api/cards";
  if (!backendUrl) {
    console.error("Environment variable BACKEND_CARDS is not set.");
    throw new Error("Backend URL is not configured.");
  }

  const queryParams = new URLSearchParams();
  const page = params.page ? parseInt(params.page, 10) : 0;
  const size = params.size ? parseInt(params.size, 10) : 20;

  queryParams.append("page", page.toString());
  queryParams.append("size", size.toString());
  for (const key in params) {
    if (Object.prototype.hasOwnProperty.call(params, key)) {
      if (key !== "page" && key !== "size" && params[key]) {
        queryParams.append(key, params[key].toString());
      }
    }
  }

  const requestUrl = `${backendUrl}?${queryParams.toString()}`;
  console.log("Making request to:", requestUrl);

  try {
    const response = await fetch(requestUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
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

    return {
      content: data.content || [],
      page: {
        number: data.page.currentPage || page,
        totalPages: data.page.totalPages || 1,
        totalElements: data.page.totalElements,
        size: data.page.size || size,
      },
    };
  } catch (error) {
    console.error("Error during cardRequest:", error);
    throw error;
  }
}
