
import React, { useState } from "react";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import ModalLoadPartenaireImageStore from "../../components/amesComponents/partenaires/ModalLoadPartenaireImageStore";
import MyTablePartenaireImageStore from "../../components/amesComponents/partenaires/MyTablePartenaireImageStore";
const Partenaire: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <>
                  <Breadcrumb pageName="Partenaire info" />

                  <div className="p-5">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center justify-center rounded-md border border-primary py-4 px-10 text-center font-medium text-primary hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          Add partenaire
        </button>
      </div>

      {/* Modal for adding a Images */}
      <ModalLoadPartenaireImageStore isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />

      {/* Table displaying Images */}
      <MyTablePartenaireImageStore />

    </div>
    </>
  );
};

export default Partenaire;
