import Breadcrumb from "../../components/Breadcrumbs/Breadcrumb";

const Contact = () => {
    return (
        <>
              <Breadcrumb pageName="Contact" />

              <div style={{ backgroundColor: '#f1f1f1', padding: '20px', textAlign: 'center' }}>
        <h1 style={{ color: '#333', fontSize: '36px', marginBottom: '10px' }}>Contact!</h1>
        <p style={{ color: '#666', fontSize: '18px' }}>Welcome to my website!</p>
      </div>
        </>
    );
  };
  
  export default Contact;