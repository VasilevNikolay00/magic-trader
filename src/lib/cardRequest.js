export async function cardRequest(params = {}) {
  const backendUrl = "http://localhost:8080/api/cards"; // Get the base URL from environment
  if (!backendUrl) {
    console.error("Environment variable BACKEND_CARDS is not set.");
    throw new Error("Backend URL is not configured.");
  }

  const queryParams = new URLSearchParams();

  const page = params.page ? parseInt(params.page, 10) : 0;
  const pageSize = params.pageSize ? parseInt(params.pageSize, 10) : 20;

  queryParams.append("page", page.toString());
  queryParams.append("pageSize", pageSize.toString());

  for (const key in params) {
    if (Object.prototype.hasOwnProperty.call(params, key)) {
      // Avoid re-adding page and pageSize as we handled them above,
      // and only add if the value is not null/undefined/empty string
      if (key !== "page" && key !== "pageSize" && params[key]) {
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
        pageSize: data.page.pageSize || pageSize,
      },
    };
  } catch (error) {
    console.error("Error during cardRequest:", error);
    throw error;
  }
}
