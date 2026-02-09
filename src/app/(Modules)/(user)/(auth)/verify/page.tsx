import React from "react";
import { ArrowRight, BadgeCheck, CircleX } from "lucide-react";
import Link from "next/link";
import { verifyToken } from "@/lib/Actions/verifyToken";

interface VerifyPageProps {
  searchParams: Promise<{ token?: string }>;
}

const VerifyPage = async ({ searchParams }: VerifyPageProps) => {
  const { token } = await searchParams;

  // Handle missing token
  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full  rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full mb-4">
                <CircleX className="h-8 w-8 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Invalid Link</h3>
              <p className="mb-6">
                No verification token was provided. Please check your email and click the verification link.
              </p>
              <Link
                href="/register"
                className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const result = await verifyToken(token);

  if (result.type === "success") {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full  rounded-2xl shadow-lg overflow-hidden">
          <div className="p-6">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full mb-4">
                <BadgeCheck className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold mb-2">
                Email Verified Successfully!
              </h3>
              <p className="mb-6">
                Your email address has been successfully verified. You can now
                access all features of your account.
              </p>
              <div className=" rounded-lg p-4 mb-6">
                <p className="text-green-800 dark:text-green-300 text-sm font-medium">
                  <BadgeCheck className="inline-block mr-1 h-4 w-4" />
                  Account verified successfully
                </p>
              </div>
              <Link
                href="/login"
                className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Continue to Login
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full  rounded-2xl shadow-lg overflow-hidden">
        <div className="p-6">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full mb-4">
              <CircleX className="h-8 w-8 text-red-600" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Verification Failed</h3>
            <p className="mb-6">{result.message}</p>
            <div className=" rounded-lg p-4 mb-6">
              <p className="text-red-800 text-sm font-medium">
                <CircleX className="inline-block mr-1 h-4 w-4" />
                Error: {result.message}
              </p>
            </div>
            <div className="space-y-3">
              <Link
                href="/register"
                className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Create New Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyPage;