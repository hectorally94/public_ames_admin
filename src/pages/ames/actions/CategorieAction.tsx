
import React, { useState } from "react";
import Breadcrumb from "../../../components/Breadcrumbs/Breadcrumb";
import ModalCategoryActionAdd from "../../../components/amesComponents/Actions/category/ModalCategoryActionAdd";
import MyTableCategoryAction from "../../../components/amesComponents/Actions/category/MyTableCategoryAction";

const CategorieAction: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <>
                  <Breadcrumb pageName="Type Categorie" />

                  <div className="p-5">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center justify-center rounded-md border border-primary py-4 px-10 text-center font-medium text-primary hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          Add CategorieAction
        </button>
      </div>

      {/* Modal for adding a CategorieAction */}
      <ModalCategoryActionAdd isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />

      {/* Table displaying CategorieActions */}
      <MyTableCategoryAction />

    </div>
    </>
  );
};

export default CategorieAction;
