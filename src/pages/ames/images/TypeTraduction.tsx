
import React, { useState } from "react";
import Breadcrumb from "../../../components/Breadcrumbs/Breadcrumb";
import ModalTypeImageTranslateAdd from "../../../components/amesComponents/images/typesTranslate/ModalTypeImageTranslateAdd";
import MyTableTypeImageTranslate from "../../../components/amesComponents/images/typesTranslate/MyTableTypeImageTranslate";
const TypeTraduction: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <>
                  <Breadcrumb pageName="TypeTraduction" />

                  <div className="p-5">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center justify-center rounded-md border border-primary py-4 px-10 text-center font-medium text-primary hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          Add TypeTraduction
        </button>
      </div>

      {/* Modal for adding a TypeTraduction */}
      <ModalTypeImageTranslateAdd isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />

      {/* Table displaying TypeTraductions */}
      <MyTableTypeImageTranslate />

    </div>
    </>
  );
};

export default TypeTraduction;
