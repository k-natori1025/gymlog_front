"use client"

import { useRouter } from "next/navigation";
import HeaderLayout from "./components/templates/HeaderLayout";
import { useAppContext } from "./functions/contexts/AppContext";

export default function Home() {
  const router = useRouter()
  const { user } = useAppContext()
  if(!user) {
    router.push("/auth/login")
  }
  if (!user) {
    return null  // リダイレクトされる前に一瞬表示されるものを防ぐ
  }
  return (
    <HeaderLayout>
      <p>Top</p>
    </HeaderLayout>
  );
}
