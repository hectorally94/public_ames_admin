
import React, { useState } from "react";
import Breadcrumb from "../../../components/Breadcrumbs/Breadcrumb";
import ModalLoadImageStore from "../../../components/amesComponents/blog/blogs/ModalLoadImageStore";
import MyTablePost from "../../../components/amesComponents/blog/blogs/MyTablePost";

const Blog: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <>
                  <Breadcrumb pageName="Blog" />

                  <div className="p-5">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center justify-center rounded-md border border-primary py-4 px-10 text-center font-medium text-primary hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
        Post Blog
        </button>
      </div>

      {/* Modal for adding a Images */}
      <ModalLoadImageStore isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />

      {/* Table displaying Images */}
      <MyTablePost />

    </div>
    </>
  );
};

export default Blog;
