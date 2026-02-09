import { IUserProfile } from "@/app/(Modules)/profile/types/types";

export const ProfileHeader = ({ user }: { user: IUserProfile }) => {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <p className="text-xs uppercase tracking-wider text-slate-400 mb-1">
            {user.name ? "Name" : "Username"}
          </p>
          <p className="text-lg font-semibold text-slate-900 dark:text-white">
            {user.username ? user.username : user.name}
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wider text-slate-400 mb-1">
            Member Since
          </p>
          <p className="text-lg font-semibold text-slate-900 dark:text-white">
            {new Date(user.createdAt).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
      </div>
    </div>
  );
};