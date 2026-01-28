import AdminDeleteAndEditButton from "@/app/components/AdminDeleteAndEditButton";
import Drawar from "@/app/components/Drawar";
import { domain_name } from "@/app/utils/Domain";
import { verifyTokenForPage } from "@/app/utils/verifyToken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
interface IComents {
  articleId: number;
  createdAt: Date;
  id: number;
  text: string;
  updatedAt: Date;
  user: { id: number; username: string; email: string };
  userId: number;
}
export default async function AdminCommentPage() {
  const cookieStore = cookies();
  const token = (await cookieStore)?.get("token");
  const payload = verifyTokenForPage(token?.value || "");
  if (!payload?.isAdmin) {
    redirect("/");
  }

  const response = await fetch(`${domain_name}/api/comments`, {
    cache: "no-store",
    headers: {
      Cookie: `token=${token?.value}`,
    },
  });
  if (!response.ok) {
    return;
  }
  let data = await response.json();
  const comments: IComents[] = data.comments;

  return (
    <Drawar username={payload?.username}>
      <main className="flex min-h-screen  bg-gray-50 ml-50  w-9xl">
        <div className="flex-1 overflow-auto">
          <header className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white/90 px-4 py-3 backdrop-blur">
            <h1 className="text-xl font-bold text-gray-800 sm:text-2xl">
              Comments
            </h1>
          </header>

          <section className="p-4 sm:p-6 lg:p-8">
            <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white shadow-sm">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-50 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">
                  <tr>
                    <th scope="col" className="px-3 py-3 sm:px-6">
                      Comment
                    </th>
                    <th
                      scope="col"
                      className="hidden md:table-cell px-3 py-3 sm:px-6"
                    >
                      Created at
                    </th>
                    <th scope="col" className="px-3 py-3 text-right sm:px-6">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {comments.length === 0 ? (
                    <tr>
                      <td
                        colSpan={3}
                        className="px-3 py-10 text-center text-gray-500 sm:px-6"
                      >
                        No comments yet.
                      </td>
                    </tr>
                  ) : (
                    comments.map((c) => (
                      <tr key={c.id} className="hover:bg-gray-50">
                        <td className="whitespace-normal px-3 py-4 text-gray-800 sm:px-6">
                          {c.text}
                        </td>
                        <td className="hidden whitespace-nowrap px-3 py-4 text-gray-600 md:table-cell sm:px-6">
                          {new Date(c.createdAt).toLocaleDateString()}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-right text-xs font-medium sm:px-6">
                          <AdminDeleteAndEditButton
                            id={payload?.id}
                            userId={c.userId}
                            commentId={c.id}
                          />
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
    </Drawar>
  );
}
