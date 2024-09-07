
import React, { useState } from "react";
import Breadcrumb from "../../../components/Breadcrumbs/Breadcrumb";
import ModalTypeActionsTranslateAdd from "../../../components/amesComponents/Actions/typesTranslate/ModalTypeActionsTranslateAdd";
import MyTableTypeActionsTranslate from "../../../components/amesComponents/Actions/typesTranslate/MyTableTypeActionsTranslate";
const TypeActionTraduction: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <>
                  <Breadcrumb pageName="TypeActionTraduction" />

                  <div className="p-5">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center justify-center rounded-md border border-primary py-4 px-10 text-center font-medium text-primary hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          Add TypeActionTraduction
        </button>
      </div>

      {/* Modal for adding a TypeActionTraduction */}
      <ModalTypeActionsTranslateAdd isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />

      {/* Table displaying TypeActionTraductions */}
      <MyTableTypeActionsTranslate />

    </div>
    </>
  );
};

export default TypeActionTraduction;
