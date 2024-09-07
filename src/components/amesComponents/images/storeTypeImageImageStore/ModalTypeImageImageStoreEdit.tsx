import React, { useState } from "react";
import Modal from "../../../modal/Modal";
import Alert from "../../AmesAlert/Alert";
import SmallLoader from "../../../../common/Loader/SmallLoader";
import { RootState } from "../../../../common/store";
import { useSelector } from "react-redux";
import { useUpdateImage_store_imagesMutation } from "../../../../features/api/storeImageApiSlice";

interface ModalImage_profilesimagesAddProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalTypeImageImageStoreEdit: React.FC<ModalImage_profilesimagesAddProps> = ({ isOpen, onClose }) => {
  const selectedId = useSelector((state: RootState) => state.imgIdSlice.payload);
  console.log("selectedId", selectedId);

  const [Update] = useUpdateImage_store_imagesMutation();
  const [alert, setAlert] = useState<{ type: 'success' | 'warning' | 'error'; title: string; message: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null); // State for file input
  const [errors, setErrors] = useState<{ file: string }>({ file: '' });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFile(file);
    
    // Clear previous errors
    setErrors({ file: '' });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { file: '' };

    if (!file) {
      newErrors.file = 'A file is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      if (file) {
        formData.append('file', file);
      }

      await Update({id:selectedId,formData}).unwrap();
      setAlert({
        type: "success",
        title: "Success",
        message: "File uploaded successfully!",
      });
      setFile(null); // Clear the file input
      onClose();
    } catch (error) {
      setAlert({
        type: "error",
        title: "Error",
        message: "Failed to upload file.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal title="Add File" isOpen={isOpen} onClose={onClose}>
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
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                File Upload
              </h3>
            </div>
            
            <div className="mt-4">
              <label htmlFor="file" className="block text-sm font-medium text-gray-700 dark:text-white">
                Choose a file
              </label>
              <input
                type="file"
                id="file"
                name="file"
                onChange={handleFileChange}
                className={`mt-1 p-2 block w-full border dark:text-white ${errors.file ? 'border-red-500' : 'border-gray-300'} rounded-md focus:outline-none focus:ring-blue-300 focus:border-blue-300`}
              />
              {errors.file && <p className="text-red-500 text-sm mt-1">{errors.file}</p>}
            </div>

            <button
              type="submit"
              className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90 mt-4"
            >
              {loading ? <SmallLoader /> : 'Add File'}
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default ModalTypeImageImageStoreEdit;
