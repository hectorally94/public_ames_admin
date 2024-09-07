
import React, { useState } from "react";
import Breadcrumb from "../../../components/Breadcrumbs/Breadcrumb";
import ModalTypeEventAdd from "../../../components/amesComponents/Events/types/ModalTypeEventAdd";
import MyTableTypeEvent from "../../../components/amesComponents/Events/types/MyTableTypeEvent";

const TypeEvent: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <>
                  <Breadcrumb pageName="TypeEvent" />

                  <div className="p-5">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center justify-center rounded-md border border-primary py-4 px-10 text-center font-medium text-primary hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          Add TypeEvent
        </button>
      </div>

      {/* Modal for adding a TypeEvent */}
      <ModalTypeEventAdd isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />

      {/* Table displaying TypeEvents */}
      <MyTableTypeEvent />

    </div>
    </>
  );
};

export default TypeEvent;
