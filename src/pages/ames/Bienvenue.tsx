
import React, { useState } from "react";
import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";
import ModalWelcomesTranslateAdd from "../../components/amesComponents/Bienvenue/ModalwelcomesTranslateAdd";
import MyTablewelcomesTranslate from "../../components/amesComponents/Bienvenue/MyTablewelcomesTranslate";
const Bienvenue: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <>
                  <Breadcrumb pageName="Bienvenue" />

                  <div className="p-5">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center justify-center rounded-md border border-primary py-4 px-10 text-center font-medium text-primary hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          Add Bienvenue
        </button>
      </div>

      {/* Modal for adding a Bienvenue */}
      <ModalWelcomesTranslateAdd isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />

      {/* Table displaying Bienvenues */}
      <MyTablewelcomesTranslate />

    </div>
    </>
  );
};

export default Bienvenue;
