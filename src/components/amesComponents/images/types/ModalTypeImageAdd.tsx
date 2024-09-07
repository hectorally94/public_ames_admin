import React, { useState } from "react";
import SmallLoader from "../../../../common/Loader/SmallLoader";
import Modal from "../../../modal/Modal";
import Alert from "../../AmesAlert/Alert";
import { useCreateTypeImageMutation } from "../../../../features/api/typeImagesApiSlice";

interface ModalTypeActionAddProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalTypeImageAdd: React.FC<ModalTypeActionAddProps> = ({ isOpen, onClose }) => {
  const [type, setType] = useState<string>("");
  const [createTypeImage] = useCreateTypeImageMutation();
  const [alert, setAlert] = useState<{ type: 'success' | 'warning' | 'error'; title: string; message: string } | null>(null);
  const [loading, setLoading] = useState(false); // State to track loading

  
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation
    if (!type) {
      setAlert({
        type: 'error',
        title: 'Submission Error',
        message: 'Please enter a language.',
      });
      return;
    }

    setLoading(true); // Start loading

    try {
        await createTypeImage({ type }).unwrap();
        setAlert({
          type: "success",
          title: "Success",
          message: "Type action created successfully!",
        });
        setType("");
        onClose();
      } catch (error) {
        setAlert({
          type: "error",
          title: "Error",
          message: "Failed to create type action.",
        });
      } finally {
      setLoading(false); // Stop loading
    }
  };
  return (
    <Modal title="Add Type" isOpen={isOpen} onClose={onClose}>
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
      {loading ? <SmallLoader /> : 'Add Type'}
      </button>
            </div>
          </div>
        </form>
    
    </Modal>
  );
};

export default ModalTypeImageAdd;
