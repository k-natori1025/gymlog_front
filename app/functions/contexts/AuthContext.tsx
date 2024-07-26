"use client"

import { GoogleAuthProvider, TwitterAuthProvider, User, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { auth } from "../libs/firebase";
import axios from "axios";
import { API } from "../constants/apis";
import { useRouter } from "next/navigation";

type AuthProviderProps = {
  children: ReactNode
}

type AuthContextType = {
  user: User | null,
  setUser: React.Dispatch<React.SetStateAction<User | null>>,
  loading: boolean
  login: (method: LoginMethod, credentials?: { email: string; password: string }) => Promise<void>
  authRegister: (email: string, password: string, userName: string) => Promise<void>
  logout: () => Promise<void>
}

type LoginMethod = 'email' | 'google' | 'twitter';

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// 状態をグローバルに管理
export function AuthProvider({children}: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
    })

    return () => unsubscribe()
  })

  // ログインの状態をチェック
  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get(API.session, { withCredentials: true })
        if(response.data.uid) {
          setUser(auth.currentUser)
        }
      } catch(error) {
        setUser(null)
        setError("セッションの確認中にエラーが発生しました。")
      } finally {
        setLoading(false)
      }
    }
    checkSession()

  }, [router])

  const login = async (method: LoginMethod, credentials?: { email: string; password: string }) => {
    setError(null);
    setLoading(true)
    try {
      let userCredential;
      switch (method) {
        case 'email':
          if (!credentials) throw new Error('Email and password are required');
          userCredential = await signInWithEmailAndPassword(auth, credentials.email, credentials.password);
          break;
        case 'google':
          userCredential = await signInWithPopup(auth, new GoogleAuthProvider());
          break;
        case 'twitter':
          userCredential = await signInWithPopup(auth, new TwitterAuthProvider());
          break;
        default:
          throw new Error('Invalid login method');
      }
  
      const token = await userCredential.user.getIdToken();
      await axios.post(API.login, {}, {
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        withCredentials: true
      });
      router.push('/');
    } catch (error: any) {
      setError(error.message);
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    setLoading(true)
    try {
      await auth.signOut();
      await axios.post(API.logout, {}, { withCredentials: true });
      router.push('/auth/login');
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false)
    }
  }

  const authRegister = async (email: string, password: string, userName: string) => {
    setError(null);
    setLoading(true)
    try {
      await axios.post(API.userRegister, {
        name: userName,
        email, 
        password
      });
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      router.push("/");
    } catch (error: any) {
      setError(error.message);
      if(error.code === "auth/email-already-in-use") {
        alert("このメールアドレスはすでに使用されています。")
      } else {
        alert(error.message)
      }
    }
  }

  return (
    <AuthContext.Provider 
      value={{ user, setUser, loading, login, authRegister, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuthContext() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider')
  }
  return context
}

