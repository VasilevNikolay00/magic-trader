import LoginForm from "@/components/login/LoginForm";
import { redirect } from "next/dist/server/api-utils";

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center h-[90%]">
      <LoginForm />
    </div>
  );
}
