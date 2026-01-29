import { BookOpen, Users, Shield, Target, Heart } from "lucide-react";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-12 md:py-20">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-6">
            About Our Wiki Platform
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            A collaborative space where knowledge meets community. 
            We're building a better way to share and discover information.
          </p>
        </div>

        {/* Mission Statement */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 mb-12 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
              <Target className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Our Mission</h2>
          </div>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            To create an accessible, user-friendly platform where anyone can contribute 
            to collective knowledge. We believe that information should be free, 
            accurate, and easy to find.
          </p>
        </div>

        {/* Features */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-8 text-center">
            What Makes Us Different
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <Users className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Community First</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Built by and for the community. Every article and edit is a contribution 
                to shared knowledge.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <Shield className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Quality Focus</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                We maintain high standards with review systems and moderation 
                to ensure reliable information.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <BookOpen className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Easy to Use</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Intuitive interface that makes creating, editing, and discovering 
                content simple for everyone.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                  <Heart className="w-6 h-6 text-red-600 dark:text-red-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Open & Free</h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Completely free to use. We believe knowledge should be accessible 
                to everyone without barriers.
              </p>
            </div>
          </div>
        </div>

        {/* Team/Community */}
        <div className="bg-linear-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              Join Our Growing Community
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Thousands of users are already sharing knowledge, asking questions, 
              and helping each other learn. Be part of something meaningful.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">1000+</div>
                <div className="text-gray-600 dark:text-gray-400">Active Contributors</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">5000+</div>
                <div className="text-gray-600 dark:text-gray-400">Articles</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">24/7</div>
                <div className="text-gray-600 dark:text-gray-400">Available</div>
              </div>
            </div>
          </div>
        </div>

        {/* Closing */}
        <div className="text-center mt-12">
          <p className="text-lg text-gray-700 dark:text-gray-300">
            We're constantly improving and adding new features based on 
            community feedback. Have suggestions? We'd love to hear from you!
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;