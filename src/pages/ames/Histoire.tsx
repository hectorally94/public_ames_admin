
import React, { useState } from "react";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import ModalHistoireSuccessAdd from "../../components/amesComponents/HistoireSuccess/ModalHistoireSuccessAdd";
import MyTableHistoireSuccess from "../../components/amesComponents/HistoireSuccess/MyTableHistoireSuccess";

const Histoire: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <>
                  <Breadcrumb pageName="Histoire " />

                  <div className="p-5">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center justify-center rounded-md border border-primary py-4 px-10 text-center font-medium text-primary hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          Add Histoire
        </button>
      </div>

      {/* Modal for adding a HistoireSuccess */}
      <ModalHistoireSuccessAdd isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />

      {/* Table displaying HistoireSuccess */}
      <MyTableHistoireSuccess />

    </div>
    </>
  );
};

export default Histoire;
