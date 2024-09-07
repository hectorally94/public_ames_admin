import React, { useState } from "react";
import Modal from "../../modal/Modal";
import Alert from "../AmesAlert/Alert";
import SmallLoader from "../../../common/Loader/SmallLoader";
import SelectLanguage from "../Form/SelectLanguage";
import { useCreateParticipableMutation } from "../../../features/api/participablesApiSlice";
import { RootState } from "../../../common/store";
import { useSelector } from "react-redux";

interface ModalTypeActionAddProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalPartcipateAdd: React.FC<ModalTypeActionAddProps> = ({ isOpen, onClose }) => {
  const selectedId = useSelector((state: RootState) => state.languageid.selectedId);
console.log("selectedId",selectedId)

  const [type, setType] = useState<string>("");
  const [CreateParticipable] = useCreateParticipableMutation();
  const [alert, setAlert] = useState<{ type: 'success' | 'warning' | 'error'; title: string; message: string } | null>(null);
  const [loading, setLoading] = useState(false); // State to track loading

  
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation
    if (!type) {
      setAlert({
        type: 'error',
        title: 'Submission Error',
        message: 'Please enter a Description.',
      });
      return;
    }

    setLoading(true); // Start loading

    try {
        await CreateParticipable({languageId:selectedId, data:{id:0,description: type} }).unwrap();
        setAlert({
          type: "success",
          title: "Success",
          message: "Description created successfully!",
        });
        setType("");
        onClose();
      } catch (error) {
        setAlert({
          type: "error",
          title: "Error",
          message: "Failed to create Description.",
        });
      } finally {
      setLoading(false); // Stop loading
    }
  };
  return (
    <Modal title="Add post " isOpen={isOpen} onClose={onClose}>
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

          <div>
                <label className="mb-3 block text-black dark:text-white">
                  Participe
                </label>
                <textarea
                  rows={6}
                  placeholder="Participe "
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
                ></textarea>
              </div>
              <SelectLanguage/>
              <button
                type="submit"
                className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
              >
      {loading ? <SmallLoader /> : 'Add Text'}
      </button>
            </div>
          </div>
        </form>
    
    </Modal>
  );
};

export default ModalPartcipateAdd;
