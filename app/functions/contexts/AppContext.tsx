"use client"

import { User, onAuthStateChanged } from "firebase/auth";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { auth } from "../libs/firebase";

type AppProviderProps = {
  children: ReactNode
}

type AppContextType = {
  user: User | null,
  setUser: React.Dispatch<React.SetStateAction<User | null>>
}

const defaultContextData = {
  user: null,
  setUser: () => {}
}

const AppContext = createContext<AppContextType>(defaultContextData)

// 状態をグローバルに管理
export function AppProvider({children}: AppProviderProps) {
  const [user, setUser] = useState<User | null>(null)

  // ログインの状態を管理
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (newUser) => {
      setUser(newUser)
    })
    // アンマウント時に状態管理の関数をストップ=メモリリークを防ぐ
    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <AppContext.Provider 
      value={{ user, setUser }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useAppContext() {
  return useContext(AppContext)
}

