import React, { useState } from "react";
import Modal from "../../../modal/Modal";
import Alert from "../../AmesAlert/Alert";
import SmallLoader from "../../../../common/Loader/SmallLoader";
import { useCreateTypeTypeAutreInfoMutation } from "../../../../features/api/autreInfoApiSlice";
import { AutreType, useGetAllTypeAutreTranslateAllQuery } from "../../../../features/api/autreTypeApiSlice";
   
interface ModalTypeActionAddProps {
  isOpen: boolean;
  onClose: () => void;
}

interface My_CResponse {
  message: string;
  data: AutreType[];
}

const ModalTypeAutreAdd: React.FC<ModalTypeActionAddProps> = ({ isOpen, onClose }) => {
 
  const [selectedCategory, setSelectedCategory] = useState<string>('');
   const [categoryFilter, setCategoryFilter] = useState<string>('');
  
   const { data: categoryActionsData3 } = useGetAllTypeAutreTranslateAllQuery();

   const categoryActionsData = (categoryActionsData3 as unknown as My_CResponse)?.data || [];

   const filteredCategories = categoryActionsData.filter(category =>
     category?.typeTranslate?.toLowerCase().includes(categoryFilter.toLowerCase())
   );
 
  const [type, setType] = useState<string>("");
  const [Create] = useCreateTypeTypeAutreInfoMutation();
  const [alert, setAlert] = useState<{ type: 'success' | 'warning' | 'error'; title: string; message: string } | null>(null);
  const [loading, setLoading] = useState(false); // State to track loading

  
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation
    if (!type) {
      setAlert({
        type: 'error',
        title: 'Submission Error',
        message: 'Please enter a value.',
      });
      return;
    }

    setLoading(true); // Start loading

    try {
        await Create({typeAutreTranslate_id:selectedCategory, data:{id:0,money: type} }).unwrap();
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
          message: "Failed to create Value.",
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
                  info
                </label>
                <input
                  type="text"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  placeholder="Enter a value"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div> 
 {/* Category Selection with Filter */}
 <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Select Type
              </label>
              <input
                type="text"
                placeholder="Filter type tranlate"
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full mb-2 rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${
                  selectedCategory ? 'text-black dark:text-white' : ''
                }`}
              >
                <option value="">Choose type Translate</option>
                {filteredCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.typeTranslate}
                  </option>
                ))}
              </select>
            </div>   
                       <button
                type="submit"
                className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray hover:bg-opacity-90"
              >
      {loading ? <SmallLoader /> : ' Post'}
      </button>
            </div>
          </div>
        </form>
    
    </Modal>
  );
};

export default ModalTypeAutreAdd;
