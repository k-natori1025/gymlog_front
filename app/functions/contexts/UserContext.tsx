"use client"

import { onAuthStateChanged } from "firebase/auth";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { auth } from "../libs/firebase";
import axios from "axios";
import { API } from "../constants/apis";
import { useRouter } from "next/navigation";

type UserProviderProps = {
  children: ReactNode
}

type User = {
  email: string | null,
  uid: string | null,
}

type UserContextType = {
  user: User | null,
  setUser: React.Dispatch<React.SetStateAction<User | null>>,
  loading: boolean
}

const defaultContextData = {
  user: null,
  setUser: () => {},
  loading: false
}

const UserContext = createContext<UserContextType>(defaultContextData)

// 状態をグローバルに管理
export function UserProvider({children}: UserProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const router = useRouter()

  // ログインの状態をチェック
  useEffect(() => {
    const checkSession = async () => {
      try {
        const url = API.session
        const response = await axios.get(url, { withCredentials: true })
        console.log("コンテキスト発火", response)
        if(response.data.uid) {
          setUser({email: response.data.email, uid: response.data.uid})
        }
      } catch(error) {
        setUser(null)
        router.push("/auth/login")
      } finally {
        setLoading(false)
      }
    }
    checkSession()

    // firebaseの認証状態の変化を監視
    // const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
    //   if (firebaseUser) {
    //     const idToken = await firebaseUser.getIdToken();
    //     await axios.post("/login", { idToken }, { withCredentials: true });
    //     setUser({ email: firebaseUser.email, uid: firebaseUser.uid });
    //   } else {
    //     setUser(null);
    //     router.push("/auth/login")
    //   }
    //   setLoading(false);
    // });
    // // リスナーを解除
    // return () => unsubscribe()

  }, [router])

  return (
    <UserContext.Provider 
      value={{ user, setUser, loading }}
    >
      {children}
    </UserContext.Provider>
  )
}

export function useUserContext() {
  return useContext(UserContext)
}

