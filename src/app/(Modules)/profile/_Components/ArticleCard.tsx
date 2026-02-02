import DeleteAndEditButton from "@/app/(Modules)/admindashboard/_Components/DeleteAndEditButton";
import { IUserArticle } from "@/app/(Modules)/profile/types/types";

export const ArticleCard = ({ article, userId }: { article: IUserArticle, userId: number }) => (
  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm transition-all hover:shadow-md">
    <div className="p-4 bg-slate-50/50 dark:bg-slate-800/50 flex justify-end">
      <DeleteAndEditButton
        id={userId}
        userId={userId}
        articleId={article.id}
        title={article.title}
        description={article.description}
        commentText={article.comments[0]?.text || ""}
      />
    </div>
    
    <div className="p-6">
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{article.title}</h3>
      <p className="text-slate-600 dark:text-slate-400 mb-4 line-clamp-3">{article.description}</p>
      <span className="text-xs text-slate-400 italic">
        Updated: {new Date(article.updatedAt).toLocaleDateString()}
      </span>
    </div>

    {article.comments.length > 0 && (
      <div className="bg-slate-50 dark:bg-slate-800/30 p-6 border-t border-slate-100 dark:border-slate-800">
        <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300 mb-4 uppercase tracking-tight">
          Recent Comments ({article.comments.length})
        </h4>
        <div className="space-y-3">
          {article.comments.map((comment) => (
            <div key={comment.id} className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-100 dark:border-slate-800 shadow-sm">
              <p className="text-sm text-slate-800 dark:text-slate-300">{comment.text}</p>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
);