import { useEffect, useState } from 'react';
import Alert from '../../AmesAlert/Alert';
import DeleteConfirmationModal from '../../../../common/DeleteConfirmationModal';
import ModalEdit from './ModalEdit';
import { useDispatch } from 'react-redux';
import { setSelectedLanguage } from '../../../../features/reduxSlices/languageSlice';
import OverlayLoader from '../../../../common/Loader/OverlayLoader';
import ErrorLoader from '../../../../common/Loader/ErrorLoader';
import { TypeAutre, useDeleteTypeAutreMutation, useGetAllTypeAutresQuery } from '../../../../features/api/autreApiSlice';


interface LanguagesResponse {
    message: string;
    data: TypeAutre[];
  } 
const MyTable = () => {

  // Fetch data using the hook
  const { data, error, isLoading } = useGetAllTypeAutresQuery();
  const [deleteLanguage] = useDeleteTypeAutreMutation(); // Import the mutation hook
  const dispatch = useDispatch();
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; title: string; message: string } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false); // Add delete loading state


  const [deleteId, setDeleteId] = useState<number | null>(null);
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

  // Ensure `data` is in the expected shape
  const packageData = (data as unknown as LanguagesResponse)?.data || [];
   // Handler for editing a language

 
  const handleEdit = (selectedPackageItem:any) => {
    // Here, you can access the entire `selectedPackageItem` object
    dispatch(setSelectedLanguage(selectedPackageItem))
    setIsEditModalOpen(true)
  }
   // Handler for deleting a language
  const handleDelete = async (id: number) => {
    setIsModalOpen(true);
    setDeleteId(id);
  };
  const cancelDelete = () => {
    setIsModalOpen(false);
    setDeleteId(null);
  };

  const confirmDelete = async () => {
    if (deleteId !== null) {
        setDeleteLoading(true); // Set loading state

      try {
        await deleteLanguage(deleteId).unwrap();
        setAlert({
          type: 'success',
          title: 'Success',
          message: 'Language deleted successfully!',
        });
      } catch (err) {
        console.error('Failed to delete language:', err);
        setAlert({
          type: 'error',
          title: 'Error',
          message: 'Failed to delete language.',
        });
      } finally {
        setDeleteLoading(false); // Set loading state
        setIsModalOpen(false);
        setDeleteId(null);
      }
    }
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
         {/* Render OverlayLoader when deleteLoading is true */}
      {deleteLoading && <OverlayLoader />}

         {/* Display the alert if it exists */}
      {alert && <Alert type={alert.type} title={alert.title} message={alert.message} />}

        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                Autre
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {packageData.map((packageItem, key) => (
              <tr key={key}>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {packageItem.name}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className="flex items-center space-x-3.5">
                  
                    <button className="hover:text-primary" onClick={() => handleDelete(packageItem.id)}>
                      <svg
                        className="fill-current"
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M13.7535 2.47502H11.5879V1.9969C11.5879 1.15315 10.9129 0.478149 10.0691 0.478149H7.90352C7.05977 0.478149 6.38477 1.15315 6.38477 1.9969V2.47502H4.21914C3.40352 2.47502 2.72852 3.15002 2.72852 3.96565V4.8094C2.72852 5.42815 3.09414 5.9344 3.62852 6.1594L4.07852 15.4688C4.13477 16.6219 5.09102 17.5219 6.24414 17.5219H11.7004C12.8535 17.5219 13.8098 16.6219 13.866 15.4688L14.3441 6.13127C14.8785 5.90627 15.2441 5.3719 15.2441 4.78127V3.93752C15.2441 3.15002 14.5691 2.47502 13.7535 2.47502ZM7.67852 1.9969C7.67852 1.85627 7.79102 1.74377 7.93164 1.74377H10.0973C10.2379 1.74377 10.3504 1.85627 10.3504 1.9969V2.47502H7.70664V1.9969H7.67852ZM4.02227 3.96565C4.02227 3.85315 4.10664 3.74065 4.24727 3.74065H13.7535C13.866 3.74065 13.9785 3.82502 13.9785 3.96565V4.8094C13.9785 4.9219 13.8941 5.0344 13.7535 5.0344H4.24727C4.13477 5.0344 4.02227 4.95002 4.02227 4.8094V3.96565ZM11.7285 16.2563H6.27227C5.79414 16.2563 5.40039 15.8906 5.37227 15.3844L4.95039 6.2719H13.0785L12.6566 15.3844C12.6004 15.8625 12.2066 16.2563 11.7285 16.2563Z"
                          fill=""
                        />
                        <path
                          d="M9.00039 9.11255C8.66289 9.11255 8.35352 9.3938 8.35352 9.75942V13.3313C8.35352 13.6688 8.63477 13.9782 9.00039 13.9782C9.33789 13.9782 9.64727 13.6969 9.64727 13.3313V9.75942C9.64727 9.3938 9.33789 9.11255 9.00039 9.11255Z"
                          fill=""
                        />
                        <path
                          d="M11.2502 9.67504C10.8846 9.64692 10.6033 9.90004 10.5752 10.2657L10.4064 12.7407C10.3783 13.0782 10.6314 13.3875 10.9971 13.4157C11.0252 13.4157 11.0252 13.4157 11.0533 13.4157C11.3908 13.4157 11.6721 13.1625 11.6721 12.825L11.8408 10.35C11.8408 9.98442 11.5877 9.70317 11.2502 9.67504Z"
                          fill=""
                        />
                        <path
                          d="M6.72245 9.67504C6.38495 9.70317 6.1037 10.0125 6.13182 10.35L6.3287 12.825C6.35683 13.1625 6.63808 13.4157 6.94745 13.4157C6.97558 13.4157 6.97558 13.4157 7.0037 13.4157C7.3412 13.3875 7.62245 13.0782 7.59433 12.7407L7.39745 10.2657C7.39745 9.90004 7.08808 9.64692 6.72245 9.67504Z"
                          fill=""
                        />
                      </svg>
                    </button>

                    <button className="hover:text-primary"  onClick={() => handleEdit(packageItem)}>
  <svg
    className="fill-current"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C17.98 2.9 17.35 2.9 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04Z"
      fill="currentColor"
    />
  </svg>
</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <DeleteConfirmationModal
        isOpen={isModalOpen}
        onConfirm={confirmDelete}
        onClose={cancelDelete}
      />

      {/* Modal for adding a language */}
      <ModalEdit isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} />
      </div>
    </div>
  );
};

export default MyTable;

