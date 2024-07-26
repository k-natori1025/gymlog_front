"use client"

import { LoadingSpinner } from '@/app/components/atoms/button/LoadingSpinner';
import { useAuthContext } from '@/app/functions/contexts/AuthContext';
import { usePathname, useRouter } from 'next/navigation';

import { useEffect } from 'react';

const publicPaths = ['/auth/login', '/auth/register']; // 認証不要のパス

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuthContext();
  const router = useRouter()
  const pathName = usePathname()

  useEffect(() => {
    if (!loading && !user && !publicPaths.includes(pathName)) {
      router.push('/auth/login');
    }
  }, [user, loading, router, pathName]);

  if (loading) {
    return (
      <LoadingSpinner />
    )
  }

  if (!user && !publicPaths.includes(pathName)) {
    return null; // 認証が必要なページで未認証の場合は何も表示しない
  }

  return <>{children}</>;
}
