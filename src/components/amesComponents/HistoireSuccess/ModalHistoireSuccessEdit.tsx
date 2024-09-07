// components/ModalTypeEdit.tsx
import React, { useEffect, useState } from "react";
import Modal from "../../modal/Modal";
import Alert from "../AmesAlert/Alert";
import SmallLoader from "../../../common/Loader/SmallLoader";
import { RootState } from "../../../common/store";
import { useSelector } from "react-redux";
import { useUpdateHistoireSuccessMutation } from "../../../features/api/histoireSuccessApiSlice";

interface ModalTypeEditProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalHistoireSuccessEdit: React.FC<ModalTypeEditProps> = ({ isOpen, onClose }) => {
  const selectedType = useSelector((state: RootState) => state.datapassTwo.payload);

  const [title, seTitle] = useState(selectedType?.title || "");
  const [description, setDescription] = useState(selectedType?.description || "");

  const [alert, setAlert] = useState<{ type: 'success' | 'warning' | 'error'; title: string; message: string } | null>(null);
  const [update] = useUpdateHistoireSuccessMutation()
  const [loading, setLoading] = useState(false); // State to track loading

  useEffect(() => {
    if (selectedType) {
      seTitle(selectedType.title || "");
      setDescription(selectedType.description || "");
    }
  }, [selectedType]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation
    if (!title) {
      setAlert({
        type: 'error',
        title: 'Submission Error',
        message: 'Please enter title .',
      });
      return;
    }
      // Simple validation
      if (!description) {
        setAlert({
          type: 'error',
          title: 'Submission Error',
          message: 'Please enter description',
        });
        return;
      }

    setLoading(true);
    try {
      // Call the update mutation
      const response = await update({
        id: selectedType?.id!,
        data: { title:title,description:description } // Pass `type` as part of the `data` field
      });
      // Check the response and dispatch the appropriate Image
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
      seTitle("");
      setDescription("");

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
    <Modal title="Edit Post" isOpen={isOpen} onClose={onClose}>
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
                  title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => seTitle(e.target.value)}
                  placeholder="Enter a value"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

          <div>
                <label className="mb-3 block text-black dark:text-white">
                  Description 
                </label>
                <textarea
                  rows={6}
                  placeholder="Description "
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
                ></textarea>
              </div>
            <button
              type="submit"
              className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
            >
              {loading ? <SmallLoader /> : 'Post'}
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default ModalHistoireSuccessEdit;
