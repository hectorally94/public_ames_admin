import ModalAdd from "../../../components/amesComponents/Autres/type/ModalAdd";
import MyTable from "../../../components/amesComponents/Autres/type/MyTable";
import Breadcrumb from "../../../components/Breadcrumbs/Breadcrumb";

import React, { useState } from "react";

const Autre: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <>
                  <Breadcrumb pageName="Autre" />

                  <div className="p-5">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center justify-center rounded-md border border-primary py-4 px-10 text-center font-medium text-primary hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          Add autre
        </button>
      </div>

      {/* Modal for adding a language */}
      <ModalAdd isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />

      {/* Table displaying languages */}
      <MyTable />

    </div>
    </>
  );
};

export default Autre;
