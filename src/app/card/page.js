import { card } from "@/lib/card";

export default async function Page({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const cardData = await card("resolvedSearchParams.id");
}
