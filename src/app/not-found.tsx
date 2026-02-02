import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-slate-950 px-6 transition-colors duration-300">
      <div className="text-center relative z-10">
        {/* Large 404 with gradient text for a modern feel */}
        <h1 className="text-9xl font-black text-gray-100 dark:text-slate-800/50 animate-pulse">
          404
        </h1>

        <div className="-mt-10"> {/* Pull text up slightly to overlap the 404 */}
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            Page not found
          </h2>
          <p className="mt-6 text-base leading-7 text-gray-600 dark:text-slate-400">
            Sorry, Mo'men. The page you are looking for doesn't exist or has been moved.
          </p>
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="w-full sm:w-auto rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-md hover:bg-blue-500 hover:scale-105 transition-all active:scale-95"
          >
            Back to Home
          </Link>
          
    
        </div>
      </div>

      {/* Modern Background Glows - Adjusted for Dark Mode */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-125 h-125 bg-blue-500/10 dark:bg-blue-500/20 rounded-full blur-[120px]"></div>
          <div className="absolute bottom-0 right-0 w-75 h-75 bg-purple-500/10 dark:bg-purple-500/10 rounded-full blur-[100px]"></div>
      </div>
    </div>
  );
}