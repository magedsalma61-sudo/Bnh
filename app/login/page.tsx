'use client'

import { FormEvent, useState } from 'react'
import {
  browserSessionPersistence,
  setPersistence,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { auth } from '../../src/lib/firebase'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()

    setError('')

    if (!email || !password) {
      setError(
        'من فضلك أدخل البريد الإلكتروني وكلمة المرور.'
      )
      return
    }

    const firebaseAuth = auth()

    if (!firebaseAuth) {
      setError(
        'Firebase غير جاهز. تأكدي من إعدادات المشروع.'
      )
      return
    }

    try {
      setLoading(true)

      await setPersistence(
        firebaseAuth,
        browserSessionPersistence
      )

      await signInWithEmailAndPassword(
        firebaseAuth,
        email.trim(),
        password
      )

      window.location.href = '/admin'
    } catch (error) {
      console.error(error)

      setError(
        'البريد الإلكتروني أو كلمة المرور غير صحيحة.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <main
      dir="rtl"
      className="flex min-h-screen items-center justify-center bg-[#F8F6F8] px-4"
    >
      <div className="w-full max-w-md">

        <div className="mb-6 text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-[#A62B73] text-3xl text-white shadow-lg">
            🩺
          </div>

          <h1 className="mt-5 text-3xl font-black text-gray-900">
            لوحة الإدارة
          </h1>

          <p className="mt-2 text-gray-500">
            Dr. Mohamed Rohayem
          </p>
        </div>

        <form
          onSubmit={handleLogin}
          className="rounded-3xl border border-gray-200 bg-white p-6 shadow-xl sm:p-8"
        >
          <h2 className="text-xl font-black text-gray-900">
            تسجيل الدخول
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            أدخل بيانات حساب الإدارة للمتابعة.
          </p>

          {/* EMAIL */}

          <div className="mt-6">
            <label className="mb-2 block text-sm font-bold text-gray-700">
              البريد الإلكتروني
            </label>

            <input
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              placeholder="admin@example.com"
              autoComplete="email"
              className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none transition focus:border-[#A62B73] focus:bg-white focus:ring-2 focus:ring-[#A62B73]/20"
            />
          </div>

          {/* PASSWORD */}

          <div className="mt-5">
            <label className="mb-2 block text-sm font-bold text-gray-700">
              كلمة المرور
            </label>

            <div className="relative">
              <input
                type={
                  showPassword
                    ? 'text'
                    : 'password'
                }
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
                placeholder="••••••••"
                autoComplete="current-password"
                className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 pl-20 outline-none transition focus:border-[#A62B73] focus:bg-white focus:ring-2 focus:ring-[#A62B73]/20"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    (current) => !current
                  )
                }
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-xl px-3 py-2 text-sm font-bold text-[#A62B73] hover:bg-[#F5E7EF]"
              >
                {showPassword
                  ? 'إخفاء'
                  : 'عرض'}
              </button>
            </div>

            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  (current) => !current
                )
              }
              className="mt-2 text-sm font-bold text-gray-500 hover:text-[#A62B73]"
            >
              {showPassword
                ? '🔒 إخفاء كلمة المرور'
                : '👁️ عرض كلمة المرور'}
            </button>
          </div>

          {/* ERROR */}

          {error && (
            <div className="mt-5 rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600">
              {error}
            </div>
          )}

          {/* LOGIN */}

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full rounded-2xl bg-[#A62B73] px-5 py-4 font-black text-white shadow-md transition hover:bg-[#8E235F] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? 'جاري تسجيل الدخول...'
              : 'دخول إلى لوحة الإدارة'}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-gray-400">
          لوحة إدارة آمنة ومخصصة لفريق العمل
        </p>
      </div>
    </main>
  )
}