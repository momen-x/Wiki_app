import Image from "next/image";
import wiki from "@/app/images/wiki_withoutBg.png";
import { BookOpen, Users, Edit, Shield, Search, Globe } from "lucide-react";
import Link from "next/link";
import { Button } from "@/app/_Components/ui/button";
import auth from "@/auth";

export const dynamic = 'force-dynamic';

export default async function Home() {
  const session=await auth();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="w-full max-w-7xl mx-auto px-4 py-12 md:py-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6">
              Share Knowledge with
              <span className="text-blue-600 block">The Community</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl">
              Create, edit, and collaborate on articles in a modern wiki platform. 
              Share your expertise and learn from others in a friendly environment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href="/article">
                <Button size="lg" className="px-8 bg-blue-600 hover:bg-blue-700">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Browse Articles
                </Button>
              </Link>
              <Link href="/register">
                <Button size="lg" variant="outline" className="px-8">
                  <Edit className="mr-2 h-5 w-5" />
                  Start Writing
                </Button>
              </Link>
            </div>
          </div>

          <div className="flex-1 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-linear-to-r from-sky-400 to-indigo-400 rounded-3xl  opacity-30"></div>
              <Image
                src={wiki}
                alt="Wiki app illustration"
                width={400}
                height={400}
                className="relative rounded-2xl shadow-2xl"
                style={{ height: 'auto' }}
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-50 dark:bg-gray-800 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
              Why Choose Our Wiki?
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              A platform designed for knowledge sharing and collaboration
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
                <Edit className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                Easy Editing
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Create and edit articles with our intuitive editor. No technical skills required.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                Community Driven
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Collaborate with others, discuss articles, and build knowledge together.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center mb-4">
                <Search className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                Easy Discovery
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Find exactly what you're looking for with our powerful search and categorization.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-amber-600 dark:text-amber-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                Quality Control
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Maintain high-quality content with review systems and moderation tools.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center mb-4">
                <Globe className="w-6 h-6 text-red-600 dark:text-red-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                Accessible Anywhere
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Access the wiki from any device. Fully responsive and mobile-friendly.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                Rich Content
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Support for text, images, code snippets, and organized categories.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="bg-linear-to-r from-blue-500 to-indigo-600 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Share Your Knowledge?
          </h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Join our growing community of contributors and start creating valuable content today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/article">
              <Button size="lg" variant="outline" className="border-white text-gray-600 hover:bg-white/10 px-8 dark:text-gray-200">
                Explore Articles
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}