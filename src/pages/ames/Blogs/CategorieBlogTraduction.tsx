
import React, { useState } from "react";
import Breadcrumb from "../../../components/Breadcrumbs/Breadcrumb";
 import MyTableCategoryBlogTranslate from "../../../components/amesComponents/blog/categoryTranslate/MyTableCategoryBlogTranslate";
import ModalCategoryBlogTranslateAdd from "../../../components/amesComponents/blog/categoryTranslate/ModalCategoryBlogTranslateAdd";
 const CategorieBlogTraduction: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <>
                  <Breadcrumb pageName="CategorieBlogTraduction" />

                  <div className="p-5">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center justify-center rounded-md border border-primary py-4 px-10 text-center font-medium text-primary hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          Add CategorieBlogTraduction
        </button>
      </div>

      {/* Modal for adding a CategorieBlogTraduction */}
      <ModalCategoryBlogTranslateAdd isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />

      {/* Table displaying CategorieBlogTraductions */}
      <MyTableCategoryBlogTranslate />

    </div>
    </>
  );
};

export default CategorieBlogTraduction;
