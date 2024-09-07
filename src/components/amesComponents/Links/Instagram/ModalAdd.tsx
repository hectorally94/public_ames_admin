import React, { useEffect, useState } from "react";
import Modal from "../../../modal/Modal";
import Alert from "../../AmesAlert/Alert";
 import SmallLoader from "../../../../common/Loader/SmallLoader";
import { useCreateLinkInstagramMutation } from "../../../../features/api/linkInstagramApiSlice";

interface ModalAddProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalAdd: React.FC<ModalAddProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState("");
  const [alert, setAlert] = useState<{ type: 'success' | 'warning' | 'error'; title: string; message: string } | null>(null);
  const [createlink] = useCreateLinkInstagramMutation(); // Hook for creating a link
  const [loading, setLoading] = useState(false); // State to track loading

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

    setLoading(true); // Start loading

    try {
      // Call the mutation function
      await createlink({ name }).unwrap(); // Unwrap to handle success or error directly

      setAlert({
        type: 'success',
        title: 'Success',
        message: 'link added successfully!',
      });

      // Optionally clear the form
      setName("");
      // Close the modal after a short delay
      setTimeout(onClose, 2000); // Optional: Close modal after 2 seconds
    } catch (error) {
      // Handle error
      setAlert({
        type: 'error',
        title: 'Submission Error',
        message: 'Failed to add link. Please try again.',
      });
    } finally {
      setLoading(false); // Stop loading
    }
  };

  // Automatically dismiss the alert after 3 seconds
  useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => {
        setAlert(null);
      }, 2000); // Dismiss after 3 seconds

      // Clear the timer if the component unmounts or alert changes
      return () => clearTimeout(timer);
    }
  }, [alert]);

  return (
    <Modal title="Add link" isOpen={isOpen} onClose={onClose}>
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
      {loading ? <SmallLoader /> : 'Add link'}
      </button>
            </div>
          </div>
        </form>
    
    </Modal>
  );
};

export default ModalAdd;
