
import React, { useState } from "react";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import ModalImpactAdd from "../../components/amesComponents/impact/ModalImpactAdd";
import MyTableImpact from "../../components/amesComponents/impact/MyTableImpact";

const Impact: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <>
                  <Breadcrumb pageName="Impact " />

                  <div className="p-5">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center justify-center rounded-md border border-primary py-4 px-10 text-center font-medium text-primary hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          Add Imapct
        </button>
      </div>

      {/* Modal for adding a Impact */}
      <ModalImpactAdd isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />

      {/* Table displaying Impact */}
      <MyTableImpact />

    </div>
    </>
  );
};

export default Impact;
