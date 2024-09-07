import React, { useState } from "react";
import SmallLoader from "../../../../common/Loader/SmallLoader";
import Modal from "../../../modal/Modal";
import Alert from "../../AmesAlert/Alert";
import { useCreateCategoryActionMutation } from "../../../../features/api/categoryActionApiSlice";

interface ModalCategoryActionAddProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalCategoryActionAdd: React.FC<ModalCategoryActionAddProps> = ({ isOpen, onClose }) => {
  const [categoryName, setCategoryName] = useState<string>("");
  const [createCategoryAction] = useCreateCategoryActionMutation();
  const [alert, setAlert] = useState<{ Category: 'success' | 'warning' | 'error'; title: string; message: string } | null>(null);
  const [loading, setLoading] = useState(false); // State to track loading

  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation
    if (!categoryName) {
      setAlert({
        Category: 'error',
        title: 'Submission Error',
        message: 'Please enter a Category.',
      });
      return;
    }

    setLoading(true); // Start loading

    try {
        await createCategoryAction({
          categoryName,
          id: 0
        }).unwrap();
        setAlert({
          Category: "success",
          title: "Success",
          message: "Category action created successfully!",
        });
        setCategoryName("");
        onClose();
      } catch (error) {
        setAlert({
          Category: "error",
          title: "Error",
          message: "Failed to create Category action.",
        });
      } finally {
      setLoading(false); // Stop loading
    }
  };
  return (
    <Modal title="Add Category" isOpen={isOpen} onClose={onClose}>
      {alert && (
        <Alert
          type={alert.Category}
          title={alert.title}
          message={alert.message}
        />
      )}
     
        <form onSubmit={handleSubmit}>
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="p-6.5">
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Category
                </label>
                <input
                  type="text"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  placeholder="Enter your Category"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <button
                type="submit"
                className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
              >
      {loading ? <SmallLoader /> : 'Add Category'}
      </button>
            </div>
          </div>
        </form>
    
    </Modal>
  );
};

export default ModalCategoryActionAdd;
