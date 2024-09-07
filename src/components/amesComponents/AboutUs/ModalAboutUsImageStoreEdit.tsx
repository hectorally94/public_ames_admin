import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../common/store";
import Modal from "../../modal/Modal";
import Alert from "../AmesAlert/Alert";
import SmallLoader from "../../../common/Loader/SmallLoader";
import { useUpdateAboutUsMutation } from "../../../features/api/aboutUsApiSlice";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalAboutUsImageStoreEdit: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const selectedId = useSelector((state: RootState) => state.imgIdSlice.payload);
  const [alert, setAlert] = useState<{ type: 'success' | 'warning' | 'error'; title: string; message: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const [Update] = useUpdateAboutUsMutation();

  const [fullname, setFullname] = useState("");
  const [post, setPost] = useState("");


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
 // Simple validation
 if (!fullname) {
  setAlert({
    type: 'error',
    title: 'Submission Error',
    message: 'Please enter a value.',
  });
  return;
} // Simple validation
if (!post) {
  setAlert({
    type: 'error',
    title: 'Submission Error',
    message: 'Please enter a value.',
  });
  return;
}
    setLoading(true);
    try {
      await Update({
        id: selectedId,
        data: { 
          content: fullname,
          title: post
         },
      }).unwrap();
      setAlert({
        type: "success",
        title: "Success",
        message: "updated successfully!",
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
    <Modal title="Update Post" isOpen={isOpen} onClose={onClose}>
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
                  value={post}
                  onChange={(e) => setPost(e.target.value)}
                  placeholder="Enter your title"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
         
          </div>

          <div className="mb-4.5">
                <label className="mb-3 block text-black dark:text-white">
                Description 
                </label>
                <textarea
                  rows={6}
                  placeholder="Description "
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
                ></textarea>
              </div>
              <button
              type="submit"
              className="flex w-full justify-center rounded bg-primary p-3 font-medium text-white hover:bg-opacity-90"
            >
              {loading ? <SmallLoader /> : 'Post'}
            </button>
        </div>
      </form>
    </Modal>
  );
};

export default ModalAboutUsImageStoreEdit;
