// src/lib/actions/jokes.action.ts
export const getAllJokes = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/jokes`, {
      cache: "no-store", // important for SSR/ISR
    });

    if (!res.ok) throw new Error("Failed to fetch jokes");

    const jokes = await res.json();
    return jokes;
  } catch (error) {
    console.error("Error loading jokes:", error);
    return [];
  }
};
