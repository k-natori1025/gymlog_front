import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')

  // トークンが存在しない場合はログインページにリダイレクト
  if (!token) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  // 認証済みの場合は次の処理へ
  return NextResponse.next()
}

// 保護するルートを指定
export const config = {
  matcher: ['/', '/protected-route', '/another-protected-route'], // 保護するパスを追加
}
