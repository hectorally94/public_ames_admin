import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../common/store";
import Modal from "../../../modal/Modal";
import Alert from "../../AmesAlert/Alert";
import SmallLoader from "../../../../common/Loader/SmallLoader";
 import { useUpdateEventMutation } from "../../../../features/api/eventsApiSlice";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalPostEdit: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const recentPost = useSelector((state: RootState) => state.action.selectedAction);
console.log("recentPost",recentPost)
  const [alert, setAlert] = useState<{ type: 'success' | 'warning' | 'error'; title: string; message: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const [Update] = useUpdateEventMutation();

   const [title, setTitle] = useState(recentPost?.title || "");
  const [objectif, setObjectif] = useState(recentPost?.objectif || "");
  const [recolte, setRecolte] = useState(recentPost?.recolte|| "");
  const [description, setDescription] = useState(recentPost?.description|| "");

// Effect to update recentPost fields when recentPost changes
useEffect(() => {
  if (recentPost) {
      setTitle(recentPost.title || "");
      setObjectif(recentPost.objectif || "");
      setRecolte(recentPost.recolte || "");
      setDescription(recentPost.description || "");
  }
}, [recentPost]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation
    if (!title || !objectif || !recolte || !description ) {
      setAlert({
        type: 'error',
        title: 'Submission Error',
        message: 'Please fill in all the fields.',
      });
      return;
    }

    setLoading(true);
    setLoading(true);
    try {

      const date = new Date();
// Options to specify the format
const options: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
};
// Format the date
const formattedDate = date.toLocaleDateString('en-US', options);

      await Update({
        id: recentPost?.id,
        data: { 
          id: 0,
          title: title,
          objectif: objectif,
          recolte: recolte,
          description: description,
          date:formattedDate
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
                 Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter title"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                 Objectif
                </label>
                <input
                  type="text"
                  value={objectif}
                  onChange={(e) => setObjectif(e.target.value)}
                  placeholder="Enter objectif"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                 Recolte
                </label>
                <input
                  type="text"
                  value={recolte}
                  onChange={(e) => setRecolte(e.target.value)}
                  placeholder="Enter recolte"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>

              <div className="mb-4.5">
                <label className="mb-3 block text-black dark:text-white">
                  Description
                </label>
                <textarea
                  rows={6}
                  placeholder="Enter description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
                ></textarea>
              </div>

            <button
              type="submit"
              className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray"
            >
              {loading ? <SmallLoader /> : "Edit post"}
            </button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default ModalPostEdit;
