import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/">
      <Image src="/logo.webp" width="20" height="20" alt="Card Maxer" />
    </Link>
  );
}
