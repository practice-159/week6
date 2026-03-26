import axios from "axios";
import { Modal } from "bootstrap";
import React, { useRef, useState, useEffect } from "react";

import type { ProductType } from "./types/productType";

import Login from "./views/Login";
import Table from "./components/Table";
import Pagination from "./components/Pagination";
import ProductModalComponent from "./components/ProductModalComponent";

// week2 - .env 的資訊
const API_BASE_URL = import.meta.env.VITE_API_BASE;
const API_PATH = import.meta.env.VITE_API_PATH;

const App = () => {
  console.log("@ 執行 App 元件");
  // week1 - 產品列表
  const [productList, setProductList] = useState<ProductType[]>([]);

  // week2 - 設定全域baseURL
  const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
  });

  // week2 - 驗證登入狀態
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // week4 - 頁數
  const [pagination, setPagination] = useState({
    category: "",
    has_pre: false,
    has_next: false,
    total_pages: NaN,
    current_page: NaN,
  });

  // week2 - 取得產品api
  const fetchProducts = async (page = 1) => {
    try {
      const token = document.cookie
        .split(";")
        .find((txt) => txt.startsWith("someCookieName="))
        ?.split("=")[1];
      if (token) {
        // axiosInstance.defaults.headers.common["Authorization"] = token;
        const config = { headers: { Authorization: token } };
        const response = await axiosInstance.get(
          `/v2/api/${API_PATH}/admin/products?page=${page}`,
          config,
        );
        setPagination(response.data.pagination);
        setProductList(response.data.products);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response);
      }
    }
  };

  useEffect(() => {
    // week2 - 檢查登入狀態api(包含檢查token自動登入)
    const verifyAuthentication = async () => {
      try {
        const token = document.cookie
          .split(";")
          .find((txt) => txt.startsWith("someCookieName="))
          ?.split("=")[1];
        if (token) {
          // axiosInstance.defaults.headers.common["Authorization"] = token;
          const config = { headers: { Authorization: token } };
          const response = await axiosInstance.post(
            "/v2/api/user/check",
            {},
            config,
          );
          if (response.data.success) {
            setIsAuthenticated(true);
            fetchProducts();
          }
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error(error.response?.data.message);
        }
      }
    };
    verifyAuthentication();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // week3 - 產品資料
  const INITIAL_TEMPLATE_DATA = {
    id: "",
    num: "",
    unit: "",
    title: "",
    price: "",
    content: "",
    category: "",
    imageUrl: "",
    is_enabled: "",
    description: "",
    imagesUrl: [""],
    origin_price: "",
  };

  // week3 - Modal控制相關狀態
  const productModalRef = useRef<HTMLDivElement | null>(null);
  const productModal = useRef<Modal | null>(null);
  const [modalType, setModalType] = useState(""); // "create", "edit", "delete"

  // week3 - 產品資料模板
  const [templateData, setTemplateData] = useState(INITIAL_TEMPLATE_DATA);

  // week3 - 初始化時綁定 Modal
  useEffect(() => {
    if (productModalRef.current) {
      productModal.current = new Modal(productModalRef.current, {
        keyboard: false,
      });
    }
  }, [isAuthenticated]);

  return (
    <React.Fragment>
      {!isAuthenticated ? (
        // 沒有登入的狀態
        <div className="container">
          <div className="row justify-content-center align-items-center vh-100">
            <div className="col-3">
              <Login
                axiosInstance={axiosInstance}
                fetchProducts={fetchProducts}
                setIsAuthenticated={setIsAuthenticated}
              />
            </div>
          </div>
        </div>
      ) : (
        // 有登入的狀態
        <div className="container mt-5">
          <div className="row">
            <div className="col text-center">
              {/* 產品列表 */}
              <Table
                productList={productList}
                productModal={productModal}
                setModalType={setModalType}
                setTemplateData={setTemplateData}
                INITIAL_TEMPLATE_DATA={INITIAL_TEMPLATE_DATA}
              />
              {/* Modal */}
              <ProductModalComponent
                API_PATH={API_PATH}
                modalType={modalType}
                productModal={productModal}
                templateData={templateData}
                axiosInstance={axiosInstance}
                fetchProducts={fetchProducts}
                productModalRef={productModalRef}
              />
              <Pagination
                pagination={pagination}
                fetchProducts={fetchProducts}
              />
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default App;
