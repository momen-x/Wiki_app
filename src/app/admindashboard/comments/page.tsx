import React from "react";
import Drawar from "../../components/Drawar";
const AdminCommentPage = () => {
  return (
    <>
    <h3>Comments</h3>
    <Drawar className="mt-0">
      <section className="p-5">
        <h1 className="mb-3 text-2xl font-semibold text-gray-700">comments</h1>
        <table className="table w-full text-left">
          <thead>
            <tr>
              <th className="p-2">comment</th>
              <th className="hidden lg:inline-block p-3">Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
        </table>
      </section>
    </Drawar>
    </>
  );
};

export default AdminCommentPage;
