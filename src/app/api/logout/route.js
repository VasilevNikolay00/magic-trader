import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function GET() {
  const cookie = await cookies().then();
  cookie.delete("jwt");

  redirect("/");
}
