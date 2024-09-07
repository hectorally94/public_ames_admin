import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../common/store";
import Modal from "../../modal/Modal";
import Alert from "../AmesAlert/Alert";
import SmallLoader from "../../../common/Loader/SmallLoader";
import { Language } from "../language/Model";
import { useGetAllLanguagesQuery } from "../../../features/api/languageApiSlice";
import { useCreateAboutUsMutation } from "../../../features/api/aboutUsApiSlice";

interface ModalAddTypeImageImageStoreProps {
  isOpen: boolean;
  onClose: () => void;
}

interface LanguagesResponse {
  message: string;
  data: Language[];
} 
const ModalAddAboutUsImageStore: React.FC<ModalAddTypeImageImageStoreProps> = ({ isOpen, onClose }) => {
  const selectedId = useSelector((state: RootState) => state.imgIdSlice.payload);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [alert, setAlert] = useState<{ type: 'success' | 'warning' | 'error'; title: string; message: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const [Create] = useCreateAboutUsMutation();
  const { data, isLoading, isError } = useGetAllLanguagesQuery();
  const [fullname, setFullname] = useState("");
  const [post, setPost] = useState("");

  const packageData = (data as unknown as LanguagesResponse)?.data || [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
 // Simple validation
 if (!fullname) {
  setAlert({
    type: 'error',
    title: 'Submission Error',
    message: 'Please missing value.',
  });
  return;
} // Simple validation
if (!post) {
  setAlert({
    type: 'error',
    title: 'Submission Error',
    message: 'Please  missing value.',
  });
  return;
}
    if (!selectedOption) {
      setAlert({
        type: 'error',
        title: 'Submission Error',
        message: 'Please  missing value.',
      });
      return;
    }

    setLoading(true);
    try {
      await Create({
        languageId: selectedOption,
        imageProfileId: selectedId,
        data: { 
          id: 0,
          content: fullname,
          title: post
         },
      }).unwrap();
      setAlert({
        type: "success",
        title: "Success",
        message: "File uploaded successfully!",
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
                  value={post}
                  onChange={(e) => setPost(e.target.value)}
                  placeholder=" title"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
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
            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Select Language
              </label>
              <div className="relative z-20 bg-white mb-5 dark:bg-form-input">
                <select
                  value={selectedOption}
                  onChange={(e) => setSelectedOption(e.target.value)}
                  className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${
                    selectedOption ? 'text-black dark:text-white' : ''
                  }`}
                >
                  <option value="" disabled className="text-body dark:text-bodydark">
                    Select Language 
                  </option>
                  {isLoading ? (
                    <option disabled>Loading...</option>
                  ) : isError ? (
                    <option disabled>Error loading type</option>
                  ) : (
                    packageData?.map((type) => (
                      <option
                        key={type.id}
                        value={type.id}
                        className="text-body dark:text-bodydark"
                      >
                        {type.name}
                      </option>
                    ))
                  )}
                </select>
              </div>
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

export default ModalAddAboutUsImageStore;
