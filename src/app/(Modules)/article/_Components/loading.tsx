"use client"
import React from 'react';

const ArticlesLoadingPage = () => {
  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4">
      {/* Main Loading Container */}
      <div className="max-w-md w-full space-y-8 text-center">
        
        {/* Animated Logo/Icon */}
        <div className="relative">
          <div className="w-20 h-20 mx-auto mb-8 relative">
            {/* Outer rotating ring */}
            <div className="absolute inset-0 rounded-full border-4 border-indigo-200 animate-spin border-t-indigo-600"></div>
            {/* Inner pulsing dot */}
            <div className="absolute inset-4 bg-indigo-600 rounded-full animate-pulse flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-slate-800 animate-fade-in">
            Loading Articles
          </h2>
          <p className="text-slate-600 animate-fade-in-delay">
            Fetching the latest content for you...
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
          <div className="h-full bg-linear-to-r from-indigo-500 to-purple-600 rounded-full animate-loading-bar"></div>
        </div>

        {/* Loading States Animation */}
        <div className="space-y-3">
          <div className="flex items-center space-x-2 text-sm text-slate-500">
            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce"></div>
            <span>Connecting to server...</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-slate-500 animate-delay-300">
            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce animate-delay-100"></div>
            <span>Retrieving articles...</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-slate-500 animate-delay-600">
            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce animate-delay-200"></div>
            <span>Almost ready...</span>
          </div>
        </div>

        {/* Skeleton Cards Preview */}
        <div className="space-y-4 mt-12">
          <h3 className="text-lg font-semibold text-slate-700 mb-4">Preview</h3>
          
          {/* Skeleton Article Cards */}
          {[1, 2, 3].map((index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm p-6 animate-pulse" style={{ animationDelay: `${index * 0.2}s` }}>
              <div className="flex space-x-4">
                <div className="w-16 h-16 bg-slate-200 rounded-lg shrink-0"></div>
                <div className="flex-1 space-y-3">
                  <div className="h-4 bg-slate-200 rounded-md w-3/4"></div>
                  <div className="h-3 bg-slate-200 rounded-md w-full"></div>
                  <div className="h-3 bg-slate-200 rounded-md w-2/3"></div>
                  <div className="flex space-x-2">
                    <div className="h-2 bg-slate-200 rounded-full w-12"></div>
                    <div className="h-2 bg-slate-200 rounded-full w-16"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Message */}
      <div className="absolute bottom-8 text-center">
        <p className="text-sm text-slate-400 animate-fade-in-slow">
          Thank you for your patience
        </p>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes loading-bar {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0%); }
          100% { transform: translateX(100%); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
        
        .animate-fade-in-delay {
          animation: fade-in 0.8s ease-out 0.3s both;
        }
        
        .animate-fade-in-slow {
          animation: fade-in 1.2s ease-out 1s both;
        }
        
        .animate-loading-bar {
          animation: loading-bar 2s ease-in-out infinite;
        }
        
        .animate-delay-300 {
          animation-delay: 0.3s;
        }
        
        .animate-delay-600 {
          animation-delay: 0.6s;
        }
        
        .animate-delay-100 {
          animation-delay: 0.1s;
        }
        
        .animate-delay-200 {
          animation-delay: 0.2s;
        }
      `}</style>
    </div>
  );
};

export default ArticlesLoadingPage;