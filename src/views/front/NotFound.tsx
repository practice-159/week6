import { useEffect } from "react";
import { useNavigate } from "react-router";

const NotFound = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const clearTimeOut = setTimeout(() => {
      navigate("/");
    }, 5000);
    return () => clearTimeout(clearTimeOut);
  }, [navigate]);
  return (
    <>
      <h2>404 not found，5 秒後將導回首頁</h2>
    </>
  );
};

export default NotFound;
