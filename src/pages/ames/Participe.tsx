
import React, { useState } from "react";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import ModalPartcipateAdd from "../../components/amesComponents/Participate/ModalPartcipateAdd";
import MyTablePartcipate from "../../components/amesComponents/Participate/MyTablePartcipate";
const Participe: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <>
                  <Breadcrumb pageName="Participe" />

                  <div className="p-5">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center justify-center rounded-md border border-primary py-4 px-10 text-center font-medium text-primary hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          Add Participe
        </button>
      </div>

      {/* Modal for adding a Participe */}
      <ModalPartcipateAdd isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />

      {/* Table displaying Participes */}
      <MyTablePartcipate />

    </div>
    </>
  );
};

export default Participe;
