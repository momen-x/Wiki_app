"use client";
import React, { useState } from "react";



const ArticlesErrorPage = ({

  errorType = "fetch", // "fetch", "network", "404", "500", "timeout"
  onRetry = () => {
    // window.location.href = "/article";
  },

  onGoHome = () => {
    // window.location.href = "/";
  },
}) => {

  const [isRetrying, setIsRetrying] = useState(false);

  const handleRetry = async () => {
    setIsRetrying(true);
    await onRetry();
    setTimeout(() => setIsRetrying(false), 1000);
  };

  const getErrorContent = () => {
    switch (errorType) {
      case "network":
        return {
          icon: "🌐",
          title: "Connection Problem",
          message:
            "Unable to connect to our servers. Please check your internet connection.",
          suggestion: "Try refreshing the page or check your network settings.",
        };
      case "404":
        return {
          icon: "🔍",
          title: "Articles Not Found",
          message: "The articles you're looking for seem to have wandered off.",
          suggestion:
            "They might have been moved or deleted. Let's get you back on track.",
        };
      case "500":
        return {
          icon: "⚠️",
          title: "Server Error",
          message: "Our servers are having a moment. It's not you, it's us.",
          suggestion:
            "We're working on fixing this. Please try again in a few minutes.",
        };
      case "timeout":
        return {
          icon: "⏱️",
          title: "Request Timeout",
          message: "The request is taking longer than expected.",
          suggestion: "Our servers might be busy. Give it another try.",
        };
      default:
        return {
          icon: "📚",
          title: "Failed to Load Articles",
          message: "Something went wrong while fetching the latest articles.",
          suggestion: "Don't worry, this happens sometimes. Let's try again.",
        };
    }
  };

  const errorContent = getErrorContent();

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-amber-50 flex flex-col items-center justify-center p-4">
      {/* Main Error Container */}
      <div className="max-w-lg w-full space-y-8 text-center">
        {/* Animated Error Icon */}
        <div className="relative">
          <div className="w-32 h-32 mx-auto mb-6 relative">
            {/* Floating background circles */}
            <div className="absolute inset-0 rounded-full bg-red-100 animate-ping opacity-30"></div>
            <div className="absolute inset-4 rounded-full bg-red-200 animate-pulse"></div>

            {/* Error Icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="text-6xl animate-bounce"
                style={{ animationDelay: "0.5s" }}
              >
                {errorContent.icon}
              </div>
            </div>

            {/* Glitch effect lines */}
            <div className="absolute top-8 left-0 w-full h-1 bg-red-300 animate-glitch-1"></div>
            <div className="absolute top-16 left-0 w-full h-1 bg-orange-300 animate-glitch-2"></div>
            <div className="absolute top-24 left-0 w-full h-1 bg-red-300 animate-glitch-3"></div>
          </div>
        </div>

        {/* Error Message */}
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-slate-800 animate-fade-in">
            {errorContent.title}
          </h1>
          <p className="text-lg text-slate-600 animate-fade-in-delay">
            {errorContent.message}
          </p>
          <p className="text-sm text-slate-500 animate-fade-in-delay-2">
            {errorContent.suggestion}
          </p>
        </div>

        {/* Error Code Display */}
        <div className="inline-block bg-white rounded-lg px-4 py-2 shadow-sm animate-fade-in-delay-3">
          <span className="text-xs text-slate-400 uppercase tracking-wider">
            Error Code
          </span>
          <div className="text-sm font-mono text-red-600 font-semibold">
            {errorType.toUpperCase()}_ERROR_{Date.now().toString().slice(-4)}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4 animate-fade-in-delay-4">
          <button
            onClick={handleRetry}
            disabled={isRetrying}
            className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 disabled:from-slate-400 disabled:to-slate-500 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 disabled:scale-100 transition-all duration-200 flex items-center justify-center space-x-2"
          >
            {isRetrying ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Retrying...</span>
              </>
            ) : (
              <>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                <span>Try Again</span>
              </>
            )}
          </button>

          <button
            onClick={onGoHome}
            className="w-full bg-white hover:bg-slate-50 text-slate-700 font-semibold py-3 px-6 rounded-lg shadow border border-slate-200 hover:border-slate-300 transform hover:scale-105 transition-all duration-200 flex items-center justify-center space-x-2"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <span>Go Home</span>
          </button>
        </div>

        {/* Help Text */}
        <div className="bg-white bg-opacity-50 rounded-lg p-4 animate-fade-in-delay-5">
          <h3 className="font-semibold text-slate-700 mb-2">Need Help?</h3>
          <p className="text-sm text-slate-600">
            If the problem persists, try refreshing your browser or contact
            support. We're here to help you get back to reading amazing
            articles.
          </p>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-16 h-16 bg-red-200 rounded-full opacity-20 animate-float"></div>
        <div className="absolute bottom-32 right-16 w-12 h-12 bg-orange-200 rounded-full opacity-30 animate-float-delayed"></div>
        <div className="absolute top-40 right-20 w-8 h-8 bg-yellow-200 rounded-full opacity-25 animate-float-slow"></div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes glitch-1 {
          0%,
          100% {
            transform: translateX(0);
          }
          20% {
            transform: translateX(-2px);
          }
          40% {
            transform: translateX(2px);
          }
          60% {
            transform: translateX(-1px);
          }
          80% {
            transform: translateX(1px);
          }
        }

        @keyframes glitch-2 {
          0%,
          100% {
            transform: translateX(0);
          }
          25% {
            transform: translateX(1px);
          }
          50% {
            transform: translateX(-1px);
          }
          75% {
            transform: translateX(2px);
          }
        }

        @keyframes glitch-3 {
          0%,
          100% {
            transform: translateX(0);
          }
          10% {
            transform: translateX(-1px);
          }
          30% {
            transform: translateX(1px);
          }
          50% {
            transform: translateX(-2px);
          }
          70% {
            transform: translateX(1px);
          }
          90% {
            transform: translateX(-1px);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }

        .animate-fade-in-delay {
          animation: fade-in 0.8s ease-out 0.2s both;
        }

        .animate-fade-in-delay-2 {
          animation: fade-in 0.8s ease-out 0.4s both;
        }

        .animate-fade-in-delay-3 {
          animation: fade-in 0.8s ease-out 0.6s both;
        }

        .animate-fade-in-delay-4 {
          animation: fade-in 0.8s ease-out 0.8s both;
        }

        .animate-fade-in-delay-5 {
          animation: fade-in 0.8s ease-out 1s both;
        }

        .animate-glitch-1 {
          animation: glitch-1 2s infinite linear;
        }

        .animate-glitch-2 {
          animation: glitch-2 1.5s infinite linear;
        }

        .animate-glitch-3 {
          animation: glitch-3 1.8s infinite linear;
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float 3s ease-in-out infinite 1s;
        }

        .animate-float-slow {
          animation: float 4s ease-in-out infinite 2s;
        }
      `}</style>
    </div>
  );
};

export default ArticlesErrorPage;
