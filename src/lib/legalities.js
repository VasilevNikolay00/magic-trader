"use server";

export async function legalities(id) {
  const backendUrl = "http://localhost:8080/api/cards/legalities";
  
  if (!id) throw new Error("Card ID is required");

  try {
    const response = await fetch(`${backendUrl}/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        
      },
      cache: "no-store", 
    });

    if (!response.ok) {
      if (response.status === 404) return { data: null };
      
      const errorText = await response.text();
      throw new Error(`Backend error: ${response.status} - ${errorText}`);
    }
    
    const data = await response.json();
    return { data };
    
  } catch (error) {
    console.error("Server Action Error:", error);
    throw error; 
  }
}