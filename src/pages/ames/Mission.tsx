
import React, { useState } from "react";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import MyTableMissionImageStore from "../../components/amesComponents/mission/MyTableMissionImageStore";
import ModalLoadProfileImageStore from "../../components/amesComponents/mission/ModalLoadProfileImageStore";
const Mission: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <>
                  <Breadcrumb pageName="Mission info" />

                  <div className="p-5">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center justify-center rounded-md border border-primary py-4 px-10 text-center font-medium text-primary hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
        Add  Mission
        </button>
      </div>

      {/* Modal for adding a Images */}
      <ModalLoadProfileImageStore isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />

      {/* Table displaying Images */}
      <MyTableMissionImageStore />

    </div>
    </>
  );
};

export default Mission;
