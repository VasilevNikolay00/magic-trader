import CardOverview from "@/components/card/CardOverview";

export default async function Page({ searchParams }) {
  const resolvedSearchParams = await searchParams;

  return (
    <div className="flex flex-col h-[90%] w-full pt-4 gap-2 items-center relative ">
      <CardOverview id={resolvedSearchParams.id} />
    </div>
  );
}