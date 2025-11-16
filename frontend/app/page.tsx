'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('accessToken');
    if (token) {
      router.push('/dashboard');
    }
  }, [router]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="text-center px-4">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Task Management System
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Organize your tasks efficiently and boost productivity
        </p>
        <div className="space-x-4">
          <Link
            href="/login"
            className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="inline-block bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold border-2 border-indigo-600 hover:bg-indigo-50 transition"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </main>
  );
}