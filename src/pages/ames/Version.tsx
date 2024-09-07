
import React, { useState } from "react";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import ModalTypeVersionAdd from "../../components/amesComponents/version/ModalTypeVersionAdd";
import MyTableTypeVersion from "../../components/amesComponents/version/MyTableTypeVersion";

const Version: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <>
                  <Breadcrumb pageName="Version" />

                  <div className="p-5">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center justify-center rounded-md border border-primary py-4 px-10 text-center font-medium text-primary hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          Add Version
        </button>
      </div>

      {/* Modal for adding a Version */}
      <ModalTypeVersionAdd isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />

      {/* Table displaying Versions */}
      <MyTableTypeVersion />

    </div>
    </>
  );
};

export default Version;
