import React, { useState } from "react";
import Modal from "../../modal/Modal";
import Alert from "../AmesAlert/Alert";
import SmallLoader from "../../../common/Loader/SmallLoader";
import SelectLanguage from "../Form/SelectLanguage";
import { RootState } from "../../../common/store";
import { useSelector } from "react-redux";
import { useCreateWelcomeMutation } from "../../../features/api/welcomesApiSlice";

interface ModalWelcomesAddProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalWelcomesTranslateAdd: React.FC<ModalWelcomesAddProps> = ({ isOpen, onClose }) => {
  const selectedId = useSelector((state: RootState) => state.languageid.selectedId);
console.log("selectedId",selectedId)

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<any>("");

  const [CreateParticipable] = useCreateWelcomeMutation()
  const [alert, setAlert] = useState<{ type: 'success' | 'warning' | 'error'; title: string; message: string } | null>(null);
  const [loading, setLoading] = useState(false); // State to track loading

  
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation
    if (!title) {
      setAlert({
        type: 'error',
        title: 'Submission Error',
        message: 'Please enter a .',
      });
      return;
    }
// Simple validation
if (!description) {
  setAlert({
    type: 'error',
    title: 'Submission Error',
    message: 'Please enter a .',
  });
  return;
}

    setLoading(true); // Start loading

    try {
        await CreateParticipable({languageId:selectedId, data:{id:0,title:title , description: description} }).unwrap();
        setAlert({
          type: "success",
          title: "Success",
          message: " created successfully!",
        });
        setTitle("");
        onClose();
      } catch (error) {
        setAlert({
          type: "error",
          title: "Error",
          message: "Failed to create .",
        });
      } finally {
      setLoading(false); // Stop loading
    }
  };
  return (
    <Modal title="Add Post " isOpen={isOpen} onClose={onClose}>
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
                  onChange={(e) => setTitle(e.target.value)}
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
              <SelectLanguage/>
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

export default ModalWelcomesTranslateAdd;
