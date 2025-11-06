import LoginForm from "@/components/login/LoginForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function Page() {
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Email:", email);
    console.log("Password:", password);

    const jwt = login(email, password);
    console.log(jwt);
  };

  return (
    <div className="flex flex-col items-center justify-center h-[90%]">
      <LoginForm />
    </div>
  );
}
