
import React, { useState } from "react";
import Breadcrumb from "../../../components/Breadcrumbs/Breadcrumb";
import ModalTypeEventTranslateAdd from "../../../components/amesComponents/Events/typesTranslate/ModalTypeEventTranslateAdd";
import MyTableTypeEventTranslate from "../../../components/amesComponents/Events/typesTranslate/MyTableTypeEventTranslate";

const TypeEventTraduction: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <>
                  <Breadcrumb pageName="TypeEventTraduction" />

                  <div className="p-5">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center justify-center rounded-md border border-primary py-4 px-10 text-center font-medium text-primary hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          Add TypeEventTraduction
        </button>
      </div>

      {/* Modal for adding a TypeEventTraduction */}
      <ModalTypeEventTranslateAdd isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />

      {/* Table displaying TypeEventTraductions */}
      <MyTableTypeEventTranslate />

    </div>
    </>
  );
};

export default TypeEventTraduction;
