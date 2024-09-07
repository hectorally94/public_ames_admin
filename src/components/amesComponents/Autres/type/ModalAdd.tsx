import React, { useEffect, useState } from "react";
import Modal from "../../../modal/Modal";
import Alert from "../../AmesAlert/Alert";
 import SmallLoader from "../../../../common/Loader/SmallLoader";
import { useCreateTypeAutreMutation } from "../../../../features/api/autreApiSlice";

interface ModalAddProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalAdd: React.FC<ModalAddProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState("");
  const [alert, setAlert] = useState<{ type: 'success' | 'warning' | 'error'; title: string; message: string } | null>(null);
  const [create] = useCreateTypeAutreMutation(); // Hook for creating a 
  const [loading, setLoading] = useState(false); // State to track loading

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation
    if (!name) {
      setAlert({
        type: 'error',
        title: 'Submission Error',
        message: 'Please enter a value.',
      });
      return;
    }

    setLoading(true); // Start loading

    try {
      // Call the mutation function
      await create({ name }).unwrap(); // Unwrap to handle success or error directly

      setAlert({
        type: 'success',
        title: 'Success',
        message: ' successfully!',
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
        message: 'Failed to add value. Please try again.',
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
    <Modal title="Post" isOpen={isOpen} onClose={onClose}>
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
                  Value
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your value"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
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

export default ModalAdd;
