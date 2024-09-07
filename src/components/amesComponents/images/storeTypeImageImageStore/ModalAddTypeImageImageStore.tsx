import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../common/store";
import { useGetAllTypeImageTranslatesQuery, TypeImageTranslateDto } from "../../../../features/api/typeImageTranslateApiSlice";
import { useCreateType_image_image_storeMutation } from "../../../../features/api/storeTypeImageImageStore";
import Modal from "../../../modal/Modal";
import Alert from "../../AmesAlert/Alert";
import SmallLoader from "../../../../common/Loader/SmallLoader";

interface ModalAddTypeImageImageStoreProps {
  isOpen: boolean;
  onClose: () => void;
}

interface TypeImagesResponse {
  message: string;
  data: TypeImageTranslateDto[];
}

const ModalAddPartenaireImageStore: React.FC<ModalAddTypeImageImageStoreProps> = ({ isOpen, onClose }) => {
  const selectedId = useSelector((state: RootState) => state.imgIdSlice.payload);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [alert, setAlert] = useState<{ type: 'success' | 'warning' | 'error'; title: string; message: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const [CreateTypeImageImageStore] = useCreateType_image_image_storeMutation();
  const { data, isLoading, isError } = useGetAllTypeImageTranslatesQuery();

  const packageData = (data as unknown as TypeImagesResponse)?.data || [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedOption) {
      setAlert({
        type: 'error',
        title: 'Submission Error',
        message: 'Please select a language.',
      });
      return;
    }

    setLoading(true);
    try {
      await CreateTypeImageImageStore({
        typeImageTranslate_id: selectedOption,
        imageStore_id: selectedId,
        data: { id:0 },
      }).unwrap();
      setAlert({
        type: "success",
        title: "Success",
        message: "File uploaded successfully!",
      });
      onClose();
    } catch (error: any) {
      const errorMessage = error.data?.message || "Failed to upload file. Please try again.";
      setAlert({
        type: "error",
        title: "Error",
        message: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal title="Add Type Image to Store" isOpen={isOpen} onClose={onClose}>
      {alert && (
        <Alert
          type={alert.type}
          title={alert.title}
          message={alert.message}
        />
      )}
      <form onSubmit={handleSubmit}>
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="p-6.5">
            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Select Type
              </label>
              <div className="relative z-20 bg-white mb-5 dark:bg-form-input">
                <select
                  value={selectedOption}
                  onChange={(e) => setSelectedOption(e.target.value)}
                  className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${
                    selectedOption ? 'text-black dark:text-white' : ''
                  }`}
                >
                  <option value="" disabled className="text-body dark:text-bodydark">
                    Select type 
                  </option>
                  {isLoading ? (
                    <option disabled>Loading...</option>
                  ) : isError ? (
                    <option disabled>Error loading type</option>
                  ) : (
                    packageData?.map((type) => (
                      <option
                        key={type.id}
                        value={type.id}
                        className="text-body dark:text-bodydark"
                      >
                        {type.typeTranslate}
                      </option>
                    ))
                  )}
                </select>
              </div>
            </div>
            <button
              type="submit"
              className="flex w-full justify-center rounded bg-primary p-3 font-medium text-white hover:bg-opacity-90"
            >
              {loading ? <SmallLoader /> : 'Add Type Image'}
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default ModalAddPartenaireImageStore;
