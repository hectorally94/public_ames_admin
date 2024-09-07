
import React, { useState } from "react";
import Breadcrumb from "../../../components/Breadcrumbs/Breadcrumb";
import ModalCategoryEventAdd from "../../../components/amesComponents/Events/category/ModalCategoryEventAdd";
import MyTableCategoryEvent from "../../../components/amesComponents/Events/category/MyTableCategoryEvent";

const CategorieEvent: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <>
                  <Breadcrumb pageName="Type Categorie Events" />

                  <div className="p-5">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center justify-center rounded-md border border-primary py-4 px-10 text-center font-medium text-primary hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          Add CategorieEvent
        </button>
      </div>

      {/* Modal for adding a CategorieEvent */}
      <ModalCategoryEventAdd isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />

      {/* Table displaying CategorieEvents */}
      <MyTableCategoryEvent />

    </div>
    </>
  );
};

export default CategorieEvent;
