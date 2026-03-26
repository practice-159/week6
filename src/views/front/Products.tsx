import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";

import type { Product } from "../../types/cartProductType";

import { errorNotify } from "../../utils/toast";
import ReactToast from "../../components/ReactToast";

const API_PATH = import.meta.env.VITE_API_PATH;
const API_BASE_URL = import.meta.env.VITE_API_BASE;

const Products = () => {
  const [products, setProducts] = useState<Product[]>();
  const navigate = useNavigate();

  useEffect(() => {
    const getProducts = async () => {
      try {
        const url = `${API_BASE_URL}/v2/api/${API_PATH}/products`;
        const response = await axios.get(url);
        setProducts(response.data.products);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          errorNotify(error.response?.data);
        }
      }
    };
    getProducts();
  }, []);

  const handleView = (id: string) => {
    navigate(`/product/${id}`);
  };

  return (
    <>
      <div className="container mt-5">
        <div className="row">
          {products?.map((product) => {
            return (
              <div key={product.id} className="col-md-4 mb-3">
                <div className="card">
                  <img
                    alt="產品圖片"
                    src={product.imageUrl}
                    className="card-img-top top-img"
                  />

                  <div className="card-body">
                    <h5 className="card-title">{product.title}</h5>
                    <p className="card-text">{product.description}</p>
                    <p className="card-text">價格 ：{product.price}</p>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => handleView(product.id)}
                    >
                      查看更多
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <ReactToast />
    </>
  );
};

export default Products;
