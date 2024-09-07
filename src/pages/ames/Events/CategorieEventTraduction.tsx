
import React, { useState } from "react";
import Breadcrumb from "../../../components/Breadcrumbs/Breadcrumb";import ModalCategoryEventTranslateAdd from "../../../components/amesComponents/Events/categoryTranslate/ModalCategoryEventTranslateAdd";
import MyTableCategoryEventTranslate from "../../../components/amesComponents/Events/categoryTranslate/MyTableCategoryEventTranslate";
const CategorieEventTraduction: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <>
                  <Breadcrumb pageName="CategorieEventTraduction" />

                  <div className="p-5">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center justify-center rounded-md border border-primary py-4 px-10 text-center font-medium text-primary hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          Add CategorieEventTraduction
        </button>
      </div>

      {/* Modal for adding a CategorieEventTraduction */}
      <ModalCategoryEventTranslateAdd isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />

      {/* Table displaying CategorieEventTraductions */}
      <MyTableCategoryEventTranslate />

    </div>
    </>
  );
};

export default CategorieEventTraduction;
