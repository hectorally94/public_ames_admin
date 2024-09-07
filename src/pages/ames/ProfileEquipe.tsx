
import React, { useState } from "react";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import ModalLoadProfileImageStore from "../../components/amesComponents/EquipeOrProfile/ModalLoadProfileImageStore";
import MyTableEquipeImageStore from "../../components/amesComponents/EquipeOrProfile/MyTableEquipeImageStore";
const ProfileEquipe: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <>
                  <Breadcrumb pageName="Profile or Equipe info" />

                  <div className="p-5">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center justify-center rounded-md border border-primary py-4 px-10 text-center font-medium text-primary hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          Add Profile / Equipe
        </button>
      </div>

      {/* Modal for adding a Images */}
      <ModalLoadProfileImageStore isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />

      {/* Table displaying Images */}
      <MyTableEquipeImageStore />

    </div>
    </>
  );
};

export default ProfileEquipe;
