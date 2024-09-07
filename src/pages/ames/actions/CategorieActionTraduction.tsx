
import React, { useState } from "react";
import Breadcrumb from "../../../components/Breadcrumbs/Breadcrumb";
import ModalCategoryActionsTranslateAdd from "../../../components/amesComponents/Actions/categoryTranslate/ModalCategoryActionsTranslateAdd";
import MyTableCategoryActionsTranslate from "../../../components/amesComponents/Actions/categoryTranslate/MyTableCategoryActionsTranslate";
const CategorieActionTraduction: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <>
                  <Breadcrumb pageName="CategorieActionTraduction" />

                  <div className="p-5">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center justify-center rounded-md border border-primary py-4 px-10 text-center font-medium text-primary hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          Add CategorieActionTraduction
        </button>
      </div>

      {/* Modal for adding a CategorieActionTraduction */}
      <ModalCategoryActionsTranslateAdd isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />

      {/* Table displaying CategorieActionTraductions */}
      <MyTableCategoryActionsTranslate />

    </div>
    </>
  );
};

export default CategorieActionTraduction;
