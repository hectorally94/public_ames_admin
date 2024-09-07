// components/ModalEdit.tsx
import React, { useEffect, useState } from "react";
import Modal from "../../../modal/Modal";
import Alert from "../../AmesAlert/Alert";
 import { useSelector } from "react-redux";
 import SmallLoader from "../../../../common/Loader/SmallLoader";
import { RootState } from "../../../../common/rootReducer";
import { useUpdateLinkInstagramMutation } from "../../../../features/api/linkInstagramApiSlice";

interface ModalEditProps {
  isOpen: boolean;
  onClose: () => void;
}
const ModalEdit: React.FC<ModalEditProps> = ({ isOpen, onClose }) => {

    const selectedLanguage = useSelector((state: RootState) => state.language.selectedLanguage);
    const [name, setName] = useState(selectedLanguage?.name || "");
    const [alert, setAlert] = useState<{ type: 'success' | 'warning' | 'error'; title: string; message: string } | null>(null);
    const [updateLanguage] = useUpdateLinkInstagramMutation();
    const [loading, setLoading] = useState(false); // State to track loading
    useEffect(() => {
        if (selectedLanguage) {
          setName(selectedLanguage.name || "");
        }
      }, [selectedLanguage]);
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
  
      // Simple validation
      if (!name) {
        setAlert({
          type: 'error',
          title: 'Submission Error',
          message: 'Please enter a link.',
        });
        return;
      }
      setLoading(true)
      try {
        // Call the updatelink mutation
        const response = await updateLanguage({ id: selectedLanguage?.id!, name });
  
        // Check the response and dispatch the appropriate action
        if ('data' in response && response.data) {
          setAlert({
            type: 'success',
            title: 'Success',
            message: 'link updated successfully!',
          });
        } else {
          setAlert({
            type: 'error',
            title: 'Error',
            message: 'Failed to update link.',
          });
        }
  
        // Optionally clear the form
        setName("");
        // Close the modal
        setTimeout(onClose, 2000); // Optional: Close modal after 2 seconds
      } catch (error) {
        console.error('Error updating link:', error);
        setAlert({
          type: 'error',
          title: 'Error',
          message: 'An error occurred while updating the link.',
        });
      }
      finally {
        setLoading(false); // Stop loading
      }
    };
  
    
  return (
    <Modal title="Edit link" isOpen={isOpen} onClose={onClose}>
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
                link
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your link"
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
            </div>
            <button
              type="submit"
              className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
            >
              
              {loading ? <SmallLoader /> : 'Edit link '}
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default ModalEdit;

