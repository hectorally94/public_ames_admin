// components/ModalTypeVersionEdit.tsx
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Modal from "../../../modal/Modal";
import Alert from "../../AmesAlert/Alert";
import SmallLoader from "../../../../common/Loader/SmallLoader";
import { RootState } from "../../../../common/store";
import { useUpdateTypeActionsTranslateMutation } from "../../../../features/api/typeActionsTranslateApiSlice";

interface ModalTypeVersionEditProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalTypeActionsTranslateEdit: React.FC<ModalTypeVersionEditProps> = ({ isOpen, onClose }) => {
  const selectedType = useSelector((state: RootState) => state.datapassOne.payload);

  const [type, setType] = useState(selectedType?.description || "");
  const [alert, setAlert] = useState<{ type: 'success' | 'warning' | 'error'; title: string; message: string } | null>(null);
  const [updateVersion] = useUpdateTypeActionsTranslateMutation()
  const [loading, setLoading] = useState(false); // State to track loading

  useEffect(() => {
    if (selectedType) {
      setType(selectedType.description || "");
    }
  }, [selectedType]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation
    if (!type) {
      setAlert({
        type: 'error',
        title: 'Submission Error',
        message: 'Please enter a .',
      });
      return;
    }

    setLoading(true);
    try {
      // Call the update mutation
      const response = await updateVersion({
        id: selectedType?.id!,
        data: { typeTranslate:type } // Pass `type` as part of the `data` field
      });
      // Check the response and dispatch the appropriate action
      if ('data' in response && response.data) {
        setAlert({
          type: 'success',
          title: 'Success',
          message: ' updated successfully!',
        });
      } else {
        setAlert({
          type: 'error',
          title: 'Error',
          message: 'Failed to update .',
        });
      }

      // Optionally clear the form
      setType("");
      // Close the modal
      setTimeout(onClose, 2000); // Optional: Close modal after 2 seconds
    } catch (error) {
      console.error('Error updating :', error);
      setAlert({
        type: 'error',
        title: 'Error',
        message: 'An error occurred while updating the .',
      });
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <Modal title="Edit Text" isOpen={isOpen} onClose={onClose}>
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
                  Type
                </label>
                <input
                  type="text"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  placeholder="Enter your type"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
            <button
              type="submit"
              className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
            >
              {loading ? <SmallLoader /> : 'Edit Text'}
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default ModalTypeActionsTranslateEdit;
