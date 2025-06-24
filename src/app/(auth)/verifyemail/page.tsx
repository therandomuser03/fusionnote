'use client';

import axios from 'axios';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Loader2, CheckCircle2, XCircle } from 'lucide-react';

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || "";

  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const verifyUserEmail = async () => {
    try {
      const res = await axios.post("/api/users/verifyemail", { token });
      setVerified(true);
      setError(false);
    } catch (error: any) {
      setError(true);
      console.error("Verification error:", error?.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token.length > 0) {
      verifyUserEmail();
    } else {
      setError(true);
      setLoading(false);
    }
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 dark:bg-neutral-900 px-4">
      <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-md p-8 max-w-md w-full text-center border dark:border-neutral-700">
        {loading && (
          <>
            <Loader2 className="h-8 w-8 mx-auto animate-spin text-blue-500 dark:text-blue-400" />
            <h2 className="text-xl font-semibold mt-4 text-gray-900 dark:text-white">
              Verifying your email...
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
              Please wait a moment.
            </p>
          </>
        )}

        {!loading && verified && (
          <>
            <CheckCircle2 className="h-10 w-10 mx-auto text-green-600 dark:text-green-400" />
            <h2 className="text-xl font-semibold mt-4 text-gray-900 dark:text-white">
              Email Verified Successfully!
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
              You can now log in to your account.
            </p>
            <Link
              href="/login"
              className="mt-6 inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 dark:hover:bg-blue-500 transition"
            >
              Go to Login
            </Link>
          </>
        )}

        {!loading && error && (
          <>
            <XCircle className="h-10 w-10 mx-auto text-red-500 dark:text-red-400" />
            <h2 className="text-xl font-semibold mt-4 text-gray-900 dark:text-white">
              Verification Failed
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
              The token is missing, invalid, or has expired.
            </p>
            <Link
              href="/signup"
              className="mt-6 inline-block bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900 transition"
            >
              Go to Signup
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
