import { redirect } from "next/navigation";
import { FolderLock } from "lucide-react";
import Link from "next/link";
import { domain_name } from "@/app/utils/Domain";
import { IUserProfile } from "@/app/(Modules)/profile/types/types";
import { ProfileHeader } from "./_Components/ProfileHeader";
import { ArticleCard } from "./_Components/ArticleCard";
import ProfileError from "./_Components/ProfileError";
import auth from "@/auth";


const ProfilePage = async () => {
  const session = await auth();

  if (!session || !session.user) redirect("/");

  try {
    const response = await fetch(
      `${domain_name}/api/users/profile/${session.user.id}`,
    );

    if (!response.ok) throw new Error("Failed to fetch profile");

    const r = await response.json();
    const data: IUserProfile = r.message;

    return (
      <div className="container mx-auto px-4 py-8 max-w-5xl transition-colors">
    

        {/* Header Section */}
        <div className="flex justify-between items-center mb-10 mt-4">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
            User Profile
          </h1>
          {session.user.username && (
            <Link
              href="/profile/profileSettings"
              className="flex items-center gap-2 px-4 py-2 bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-400 rounded-xl hover:opacity-80 transition"
            >
              <span className="text-sm font-medium">Privacy Settings</span>
              <FolderLock size={18} />
            </Link>
          )}
        </div>

        {/* Info Card */}
        <ProfileHeader user={data} />

        {/* Articles Section */}
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mt-12 mb-6">
          Your Articles {"("}
          {data.articles.length}
          {")"}
        </h2>

        {data.articles.length === 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-xl p-10 text-center border border-dashed border-slate-300 dark:border-slate-700">
            <p className="text-slate-500 dark:text-slate-400">
              You haven't written any articles yet.
            </p>
          </div>
        ) : (
          <div className="grid gap-6">
            {data.articles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                userId={+session.user.id}
              />
            ))}
          </div>
        )}
      </div>
    );
  } catch (error) {
    return <ProfileError />;
  }
};

export default ProfilePage;
