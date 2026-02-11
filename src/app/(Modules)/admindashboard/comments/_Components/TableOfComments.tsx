"use client"
import { useEffect, useState } from "react";
import DeleteAndEditButton from "@/app/(Modules)/admindashboard/_Components/DeleteAndEditButton";
import { domain_name } from "@/app/utils/Domain";
import axios from "axios";


interface IComments {
  articleId: number;
  createdAt: Date;
  id: number;
  text: string;
  updatedAt: Date;
  user: { id: number; username: string; email: string };
  userId: number;
}

const TableOfComments = ({id}:{id:number}) => {

    const [comments,setComments]=useState<IComments[]>([]);

useEffect(()=>{
const fetchComment=async ()=>{  
  try {
    const response = await axios.get(`${domain_name}/api/comments`);
 
    if (!response.data) {
      const errorData = response.data.message;
      return;
    }
    const data =  response.data.comments;
   setComments(data);
  } catch (error: any) {
    console.error("the error is : ", error);
  }
}
fetchComment();
},[])
  return (
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                Comment Management
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Manage all comments in the system
              </p>
            </div>
            <div className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Total: <span className="font-semibold">{comments.length}</span>{" "}
                comments
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Comment
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Author
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider hidden md:table-cell">
                    Created at
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {comments.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center">
                      <div className="text-gray-500 dark:text-gray-400">
                        <p className="text-lg">No comments found</p>
                        <p className="text-sm mt-1">
                          Comments will appear here once users start commenting
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  comments.map((c) => (
                    <tr
                      key={c.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="max-w-md">
                          <p className="text-gray-800 dark:text-white">
                            {c.text}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-gray-800 dark:text-white font-medium">
                            {c.user.username}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {c.user.email}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-400 hidden md:table-cell">
                        {new Date(c.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                      <td className="px-6 py-4">
                        <DeleteAndEditButton
                          id={id}
                          userId={c.userId}
                          commentId={c.id}
                          commentText={c.text}
                        />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  )
}

export default TableOfComments