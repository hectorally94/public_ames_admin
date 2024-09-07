import React, { useEffect, useState } from "react";
import Alert from "../AmesAlert/Alert";
import { useDispatch } from "react-redux";
import OverlayLoader from "../../../common/Loader/OverlayLoader";
import ErrorLoader from "../../../common/Loader/ErrorLoader";
import { setimgIdSlicePayload } from "../../../features/reduxSlices/imgIdSlice";
import Base64Image from "../../../common/Base64Image";
import ModalImg from "../../modal/ModalImg";
import { useGetAllImage_profilesimagesAllQuery } from "../../../features/api/storeProfileApiSlice";
import ModalAddMissionImageStore from "./ModalAddMissionImageStore";

interface ModalAddProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalLoadProfileImageStore: React.FC<ModalAddProps> = ({ isOpen, onClose }) => {
  
  // Fetch data using the hook
  const { data, error, isLoading } = useGetAllImage_profilesimagesAllQuery()
  const dispatch = useDispatch();
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; title: string; message: string } | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  //console.log("data data",data); // Check the structure of `data`

 // Effect Hook for Alert Timeout
 useEffect(() => {
    if (alert) {
      const timer = setTimeout(() => {
        setAlert(null);
      }, 2000);
      return () => clearTimeout(timer); // Cleanup on component unmount
    }
  }, [alert]);
  
  // Handle loading state
  if (isLoading) return <div><OverlayLoader/></div>;

  // Handle error state
  if (error) return <div><ErrorLoader /></div>;

  // Ensure data is present and correctly structured


 
  const handleEdit = (Id:any) => {
    // Here, you can access the entire `selectedPackageItem` object
    dispatch(setimgIdSlicePayload(Id))
    setIsEditModalOpen(true)
  }
  
  

  


  return (
    <ModalImg title="Images" isOpen={isOpen} onClose={onClose}>
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">

         {/* Display the alert if it exists */}
      {alert && <Alert type={alert.type} title={alert.title} message={alert.message} />}
 
<div className="mt-3 grid grid-cols-1  h-96  gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
{data?.map((packageItem, key) => (
    <div key={key} className="group relative">
   
  <div className="w-full  object-cover p-6">
  <Base64Image base64String= {packageItem.imagedata} />

    <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
    {packageItem.name}
    </h5>
    
    <div className="mt-3 mb-3 flex items-center space-x-3.5">
          <button className="hover:text-primary" onClick={() => handleEdit(packageItem.id)}>
            <svg
              className="fill-current"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Edit SVG Path */}
              <path
                d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C17.98 2.9 17.35 2.9 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04Z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
  </div>
    </div>
  ))}
  
</div>

      {/* Modal for adding a TypeImage */}
      <ModalAddMissionImageStore  isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} />
      </div>
    </div>
  
    </ModalImg>
  );
};

export default ModalLoadProfileImageStore;
