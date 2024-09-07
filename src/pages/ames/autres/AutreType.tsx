
import React, { useState } from "react";
import Breadcrumb from "../../../components/Breadcrumbs/Breadcrumb";
import ModalTypeAutreAdd from "../../../components/amesComponents/Autres/typeAutreTranslate/ModalTypeAutreAdd";
import MyTableTypeAutre from "../../../components/amesComponents/Autres/typeAutreTranslate/MyTableTypeAutre";
 
const AutreType: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <>
                  <Breadcrumb pageName=" Autre Type" />

                  <div className="p-5">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center justify-center rounded-md border border-primary py-4 px-10 text-center font-medium text-primary hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          Add Type Autre info
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

export default AutreType;
