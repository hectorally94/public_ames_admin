import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../../common/store";
import Modal from "../../../modal/Modal";
import Alert from "../../AmesAlert/Alert";
import SmallLoader from "../../../../common/Loader/SmallLoader";
import { TypeEventsTranslate, useGetAllTypeEventsTranslatesQuery } from "../../../../features/api/typeEventsTranslateApiSlice";
import { useCreateEventMutation } from "../../../../features/api/eventsApiSlice";
 import { CategoryEventTranslate, useGetAllCategoryEventTranslatesQuery } from "../../../../features/api/categoryEventTranslateApiSlice";

interface ModalAddTypeImageImageStoreProps {
  isOpen: boolean;
  onClose: () => void;
}

interface My_TResponse {
  message: string;
  data: TypeEventsTranslate[];
}

interface My_CResponse {
  message: string;
  data: CategoryEventTranslate [];
}

const ModalPostAdd: React.FC<ModalAddTypeImageImageStoreProps> = ({ isOpen, onClose }) => {
  const selectedId = useSelector((state: RootState) => state.imgIdSlice.payload);
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [typeFilter, setTypeFilter] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('');
  const [alert, setAlert] = useState<{ type: 'success' | 'warning' | 'error'; title: string; message: string } | null>(null);
  const [loading, setLoading] = useState(false);

  const [Create] = useCreateEventMutation();

  const { data: typeActionsData2} = useGetAllTypeEventsTranslatesQuery();
  const { data: categoryActionsData3 } =   useGetAllCategoryEventTranslatesQuery();
  
  const typeActionsData = (typeActionsData2 as unknown as My_TResponse)?.data || [];
  const categoryActionsData = (categoryActionsData3 as unknown as My_CResponse)?.data || [];

  const filteredTypes = typeActionsData.filter(type =>
    type?.typeTranslate?.toLowerCase().includes(typeFilter.toLowerCase())
  );

  const filteredCategories = categoryActionsData.filter(category =>
    category?.categoryEventTranslate?.toLowerCase().includes(categoryFilter.toLowerCase())
  );

  const [title, setTitle] = useState("");
  const [objectif, setObjectif] = useState("");
  const [recolte, setRecolte] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !objectif || !recolte || !description || !selectedType || !selectedCategory) {
      setAlert({
        type: 'error',
        title: 'Submission Error',
        message: 'Please fill in all the fields.',
      });
      return;
    }

    setLoading(true);
    try {
      const date = new Date();
      const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
      const formattedDate = date.toLocaleDateString('en-US', options);

      await Create({
        typeEventsTranslateId: selectedType,
        categoryTranslateId: selectedCategory,
        storeImageId: selectedId,
        data: {
          id: 0,
          title: title,
          objectif: objectif,
          recolte: recolte,
          description: description,
          date: formattedDate
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

            {/* Type Selection with Filter */}
            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Select Type
              </label>
              <input
                type="text"
                placeholder="Filter types"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="w-full mb-2 rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
              />
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input ${
                  selectedType ? 'text-black dark:text-white' : ''
                }`}
              >
                <option value="">Choose type</option>
                {filteredTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.typeTranslate}
                  </option>
                ))}
              </select>
            </div>

            {/* Category Selection with Filter */}
            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Select Category
              </label>
              <input
                type="text"
                placeholder="Filter categories"
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
                <option value="">Choose category</option>
                {filteredCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.categoryEventTranslate}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end gap-4.5">
              <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center rounded bg-primary py-2 px-4 font-medium text-white transition hover:bg-primary/80"
              >
                {loading ? <SmallLoader /> : "Post"}
              </button>
              <button
                type="button"
                className="rounded bg-gray-400 py-2 px-4 font-medium text-white transition hover:bg-gray-500"
                onClick={onClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default ModalPostAdd;
