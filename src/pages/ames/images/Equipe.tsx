
import React, { useState } from "react";
import Breadcrumb from "../../../components/Breadcrumbs/Breadcrumb";
import ModalProliteAdd from "../../../components/amesComponents/images/storeProlife/ModalProliteAdd";
import MyTableProlite from "../../../components/amesComponents/images/storeProlife/MyTableProlite";

const Equipe: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <>
                  <Breadcrumb pageName="Equipe/Profile " />

                  <div className="p-5">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center justify-center rounded-md border border-primary py-4 px-10 text-center font-medium text-primary hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          Add photo
        </button>
      </div>

      {/* Modal for adding a Equipe */}
      <ModalProliteAdd isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />

      {/* Table displaying Equipe */}
      <MyTableProlite />

    </div>
    </>
  );
};

export default Equipe;
