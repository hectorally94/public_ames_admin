import React, { useState } from "react";
import Modal from "../../modal/Modal";
import Alert from "../AmesAlert/Alert";
import SmallLoader from "../../../common/Loader/SmallLoader";
import { useCreateVersionMutation } from "../../../features/api/versionsApiSlice";

interface ModalTypeActionAddProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalTypeVersionAdd: React.FC<ModalTypeActionAddProps> = ({ isOpen, onClose }) => {
  const [type, setType] = useState<string>("");
  const [createVersion] = useCreateVersionMutation();
  const [alert, setAlert] = useState<{ type: 'success' | 'warning' | 'error'; title: string; message: string } | null>(null);
  const [loading, setLoading] = useState(false); // State to track loading

  
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation
    if (!type) {
      setAlert({
        type: 'error',
        title: 'Submission Error',
        message: 'Please enter a Version.',
      });
      return;
    }

    setLoading(true); // Start loading

    try {
        await createVersion({ versionName:type }).unwrap();
        setAlert({
          type: "success",
          title: "Success",
          message: "Version created successfully!",
        });
        setType("");
        onClose();
      } catch (error) {
        setAlert({
          type: "error",
          title: "Error",
          message: "Failed to create Version.",
        });
      } finally {
      setLoading(false); // Stop loading
    }
  };
  return (
    <Modal title="Add Post" isOpen={isOpen} onClose={onClose}>
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
                  Version
                </label>
                <input
                  type="text"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  placeholder="Enter a version"
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

export default ModalTypeVersionAdd;
