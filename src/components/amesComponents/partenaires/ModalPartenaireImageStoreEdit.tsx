import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../common/store";
import Modal from "../../modal/Modal";
import Alert from "../AmesAlert/Alert";
import SmallLoader from "../../../common/Loader/SmallLoader";
import { useUpdatePartenaireMutation } from "../../../features/api/partenairesApiSlice";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalPartenaireImageStoreEdit: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const selectedId = useSelector((state: RootState) => state.imgIdSlice.payload);
  const [alert, setAlert] = useState<{ type: 'success' | 'warning' | 'error'; title: string; message: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const [Update] = useUpdatePartenaireMutation();

  const [fullname, setFullname] = useState("");
  const [post, setPost] = useState("");


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
 // Simple validation
 if (!fullname) {
  setAlert({
    type: 'error',
    title: 'Submission Error',
    message: 'Please enter Full Name.',
  });
  return;
} // Simple validation
if (!post) {
  setAlert({
    type: 'error',
    title: 'Submission Error',
    message: 'Please enter a Position.',
  });
  return;
}

    setLoading(true);
    try {
      await Update({
        id: selectedId,
        data: { 
          fullname: fullname,
          post: post
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
                  Full name
                </label>
                <input
                  type="text"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                  placeholder="Enter your  Full name"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Position hold
                </label>
                <input
                  type="text"
                  value={post}
                  onChange={(e) => setPost(e.target.value)}
                  placeholder="Enter your Position hold"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
            <button
              type="submit"
              className="flex w-full justify-center rounded bg-primary p-3 font-medium text-white hover:bg-opacity-90"
            >
              {loading ? <SmallLoader /> : 'Post'}
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default ModalPartenaireImageStoreEdit;
