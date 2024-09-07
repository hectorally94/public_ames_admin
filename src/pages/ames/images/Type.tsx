
import React, { useState } from "react";
import Breadcrumb from "../../../components/Breadcrumbs/Breadcrumb";
import ModalTypeImageAdd from "../../../components/amesComponents/images/types/ModalTypeImageAdd";
import MyTableTypeImage from "../../../components/amesComponents/images/types/MyTableTypeImage";

const Type: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <>
                  <Breadcrumb pageName="Type Categorie Images" />

                  <div className="p-5">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center justify-center rounded-md border border-primary py-4 px-10 text-center font-medium text-primary hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          Add CategorieImage
        </button>
      </div>

      {/* Modal for adding a  */}
      <ModalTypeImageAdd isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />

      {/* Table displaying  */}
      <MyTableTypeImage />

    </div>
    </>
  );
};

export default Type;
