import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";

const MyDashbord = () => {
  return (
    <>
      <Breadcrumb pageName="Ames" />

      <div className="flex flex-col items-center justify-center bg-gray-100 p-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Ames!</h1>
        <p className="text-lg text-gray-600 mb-4">Welcome to my website!</p>
        <img src="/ames1.ico" alt="Icon" className="w-34 h-34" />
      </div>
    </>
  );
};

export default MyDashbord;
