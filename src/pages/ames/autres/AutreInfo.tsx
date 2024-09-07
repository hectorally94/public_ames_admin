
import React, { useState } from "react";
import Breadcrumb from "../../../components/Breadcrumbs/Breadcrumb";
import ModalTypeAutreAdd from "../../../components/amesComponents/Autres/autreInfo/ModalTypeAutreAdd";
import MyTableTypeAutre from "../../../components/amesComponents/Autres/autreInfo/MyTableTypeAutre";
 
const AutreInfo: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <>
      <Breadcrumb pageName=" Autre Info" />

                  <div className="p-5">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center justify-center rounded-md border border-primary py-4 px-10 text-center font-medium text-primary hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          Add Autre Info
        </button>
      </div>

      {/* Modal for adding a TypeActionTraduction */}
      <ModalTypeAutreAdd isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />

      {/* Table displaying TypeActionTraductions */}
      <MyTableTypeAutre />

    </div>
    </>
  );
};

export default AutreInfo;
