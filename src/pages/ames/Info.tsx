
import React, { useState } from "react";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import ModalTypeInfoAdd from "../../components/amesComponents/Info/ModalTypeInfoAdd";
import MyTableTypeInfo from "../../components/amesComponents/Info/MyTableTypeInfo";
const Info: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <>
                  <Breadcrumb pageName="Info" />

                  <div className="p-5">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center justify-center rounded-md border border-primary py-4 px-10 text-center font-medium text-primary hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          Add Info
        </button>
      </div>

      {/* Modal for adding a Info */}
      <ModalTypeInfoAdd isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />

      {/* Table displaying Infos */}
      <MyTableTypeInfo />

    </div>
    </>
  );
};

export default Info;
