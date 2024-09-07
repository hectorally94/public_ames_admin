import { SetStateAction, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import OverlayLoader from '../../../../common/Loader/OverlayLoader';
import ErrorLoader from '../../../../common/Loader/ErrorLoader';
import Alert from '../../AmesAlert/Alert';
import DeleteConfirmationModal from '../../../../common/DeleteConfirmationModal';
 import ModalPostEdit from './ModalPostEdit';
 import CardComponent from '../../../../common/CardComponent';
import { setSelectedAction } from '../../../../features/reduxSlices/postSlice';
import { EventDto, useDeleteEventMutation, useGetPaginatedEventsQuery } from '../../../../features/api/eventsApiSlice';


interface MyResponse {
  message: string;
  data: EventDto[];
} 
const MyTablePost = () => {
/// pagination config

  const [title, setTitle] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(1);
  const [sort, setSort] = useState('id,desc'); // Default sort as a single string

  // Fetch data using the hook
  //const { data, error, isLoading } = useGetAllActionsQuery()
  const { data, error, isLoading } = useGetPaginatedEventsQuery({ title, page: currentPage, size: itemsPerPage, sort });
 
  const [deleteData] = useDeleteEventMutation () // Import the mutation hook
  
  const dispatch = useDispatch();
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; title: string; message: string } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false); // Add delete loading state
  //console.log("data data",data); // Check the structure of `data`


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


  // Extract the `data` array from the response object
 
  const handleEdit = (action:EventDto) => {
    // Here, you can access the entire `selectedPackageItem` object
    dispatch(setSelectedAction(action))
    setIsEditModalOpen(true)
  }
   // Handler for deleting a TypeImage
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
        await deleteData(deleteId).unwrap();
        setAlert({
          type: 'success',
          title: 'Success',
          message: ' deleted successfully!',
        });
      } catch (err) {
        console.error('Failed to delete :', err);
        setAlert({
          type: 'error',
          title: 'Error',
          message: 'Failed to delete .',
        });
      } finally {
        setDeleteLoading(false); // Set loading state
        setIsModalOpen(false);
        setDeleteId(null);
      }
    }
  };
  const packageData = (data as unknown as MyResponse)?.data || [];
 
  // Update the table data based on the response
const handleSearch = (e: { target: { value: SetStateAction<string>; }; }) => {
  setTitle(e.target.value);
  setCurrentPage(0); // Reset to the first page when searching
};
  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => (data && prev < data.totalPages - 1 ? prev + 1 : prev));
  };
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
         {/* Render OverlayLoader when deleteLoading is true */}
      {deleteLoading && <OverlayLoader />}

         {/* Display the alert if it exists */}
      {alert && <Alert type={alert.type} title={alert.title} message={alert.message} />}
 
       <div className="mb-4 flex items-center">
        <input
          type="text"
          placeholder="Search by title"
          value={title}
          onChange={handleSearch}
          className="px-4 py-2 border rounded-md"
        />
      </div>

      <div >    
  {packageData?.map((packageItem, key) => (
    <div key={key} className="relative flex bg-clip-border text-gray-700 shadow-md w-full flex-row">
      <CardComponent
        id={packageItem.id}
        imageSrc={`data:image/jpeg;base64,${packageItem.imagedata}`}
        title={packageItem.title}
        objectif={packageItem.objectif}
        recolte={packageItem.recolte}
        type={packageItem.typeActionsTranslate}
        category={packageItem.categoryTranslate}
        lanaguage={packageItem.languageName}
        clanaguage={packageItem.clanguageName}
        description={packageItem.description}
        date={packageItem.date}
        action={packageItem}
        onEdit={handleEdit}
        onDelete={handleDelete}      />
    </div>
  ))}
</div>
<div className="flex justify-between items-center mt-4 mb-4">
  <button
    onClick={handlePreviousPage}
    disabled={currentPage === 0}
    className={`px-4 py-2 inline-flex items-center justify-center rounded-md border border-primary font-medium text-primary transition-colors duration-200 ${currentPage === 0 ? 'bg-gray-400 cursor-not-allowed' : 'hover:bg-opacity-90'}`}
  >
    Previous
  </button>

  <span className="text-sm font-medium text-gray-700 flex items-center">
  <span className="mr-2 text-primary">Page</span>
  <span className="font-bold text-gray-900">{currentPage + 1}</span>
  <span className="mx-2 text-gray-500">of</span>
  <span className="font-bold text-gray-900">{data?.totalPages || 0}</span>
</span>


  <button
    onClick={handleNextPage}
    disabled={data?.totalPages ? currentPage >= data.totalPages - 1 : true}
    className={`px-4 py-2 inline-flex items-center justify-center rounded-md border border-primary font-medium text-primary transition-colors duration-200 ${data?.totalPages ? (currentPage >= data.totalPages - 1 ? 'bg-gray-400 cursor-not-allowed' : 'hover:bg-opacity-90') : 'bg-gray-400 cursor-not-allowed'}`}
  >
    Next
  </button>
</div>



        
        <DeleteConfirmationModal
        isOpen={isModalOpen}
        onConfirm={confirmDelete}
        onClose={cancelDelete}
      />

      {/* Modal for adding a TypeImage */}
      <ModalPostEdit  isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} />
      </div>
    </div>
  );
};

export default MyTablePost;



