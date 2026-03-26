import { ToastContainer } from "react-toastify";

const ReactToast = () => {
  return (
    <ToastContainer
      draggable
      rtl={false}
      pauseOnHover
      theme="colored"
      autoClose={3000}
      pauseOnFocusLoss
      newestOnTop={false}
      closeOnClick={false}
      position="bottom-right"
      hideProgressBar={false}
    />
  );
};

export default ReactToast;
