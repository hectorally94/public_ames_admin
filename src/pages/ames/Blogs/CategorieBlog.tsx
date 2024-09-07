
import React, { useState } from "react";
import Breadcrumb from "../../../components/Breadcrumbs/Breadcrumb";
import ModalCategoryBlogAdd from "../../../components/amesComponents/blog/category/ModalCategoryBlogAdd";
import MyTableCategoryBlog from "../../../components/amesComponents/blog/category/MyTableCategoryBlog";
const CategorieBlog: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <>
                  <Breadcrumb pageName="Type Categorie Blogs" />

                  <div className="p-5">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center justify-center rounded-md border border-primary py-4 px-10 text-center font-medium text-primary hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          Add CategorieBlog
        </button>
      </div>

      {/* Modal for adding a CategorieBlog */}
      <ModalCategoryBlogAdd isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />

      {/* Table displaying CategorieBlogs */}
      <MyTableCategoryBlog />

    </div>
    </>
  );
};

export default CategorieBlog;
