
import React, { useState } from "react";
import Breadcrumb from "../../../components/Breadcrumbs/Breadcrumb";
import ModalImgPartenaireAdd from "../../../components/amesComponents/images/storePartenaire/ModalImgPartenaireAdd";
import MyTableImgPartenaire from "../../../components/amesComponents/images/storePartenaire/MyTableImgPartenaire";
const ImgPartenaire: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <>
                  <Breadcrumb pageName="ImgPartenaire " />

                  <div className="p-5">
      <div className="flex justify-end mb-4">
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center justify-center rounded-md border border-primary py-4 px-10 text-center font-medium text-primary hover:bg-opacity-90 lg:px-8 xl:px-10"
        >
          Add photo
        </button>
      </div>

      {/* Modal for adding a ImgPartenaire */}
      <ModalImgPartenaireAdd isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} />

      {/* Table displaying ImgPartenaire */}
      <MyTableImgPartenaire />

    </div>
    </>
  );
};

export default ImgPartenaire;
