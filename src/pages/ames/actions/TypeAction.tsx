
import React, { useState } from "react";
import Breadcrumb from "../../../components/Breadcrumbs/Breadcrumb";
import ModalTypeActionAdd from "../../../components/amesComponents/Actions/types/ModalTypeActionAdd";
import MyTableTypeAction from "../../../components/amesComponents/Actions/types/MyTableTypeAction";

const TypeAction: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <>
                  <Breadcrumb pageName="TypeAction" />

                  <div className="p-5">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center justify-center rounded-md border border-primary py-4 px-10 text-center font-medium text-primary hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          Add typeAction
        </button>
      </div>

      {/* Modal for adding a typeAction */}
      <ModalTypeActionAdd isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />

      {/* Table displaying typeActions */}
      <MyTableTypeAction />

    </div>
    </>
  );
};

export default TypeAction;
