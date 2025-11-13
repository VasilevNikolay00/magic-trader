import AccountChangeForm from "@/components/account/AccountChangeForm";
import RegisterForm from "@/components/register/RegisterForm";

export default function Page() {
  return (
    <div className="flex flex-row w-full h-[90%] pt-4 gap-2 justify-center items-center">
      <RegisterForm />
    </div>
  );
}
