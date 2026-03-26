import axios from "axios";
import { useParams } from "react-router";
import { useState, useEffect } from "react";

import type { Product } from "../../types/cartProductType";

import ReactToast from "../../components/ReactToast";
import { errorNotify, successNotify } from "../../utils/toast";

const API_PATH = import.meta.env.VITE_API_PATH;
const API_BASE_URL = import.meta.env.VITE_API_BASE;

const SingleProduct = () => {
  // const { id = "" } = useParams<string>()!;
  const { id = "" } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product>();

  useEffect(() => {
    const handleView = async (id: string) => {
      try {
        const url = `${API_BASE_URL}/v2/api/${API_PATH}/product/${id}`;
        const response = await axios.get(url);
        setProduct(response.data.product);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          errorNotify(error.response?.data.message);
        }
      }
    };
    handleView(id);
  }, [id]);

  const addCart = async (id: string, num: number = 1) => {
    const data = {
      qty: num,
      product_id: id,
    };
    try {
      const url = `${API_BASE_URL}/v2/api/${API_PATH}/cart`;
      const response = await axios.post(url, { data });
      successNotify(response.data.message);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        errorNotify(error.response?.data.message);
      }
    }
  };

  return !product ? (
    <h2>查無產品</h2>
  ) : (
    <div className="container">
      <div className="card" style={{ width: "18rem" }}>
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
            onClick={() => addCart(product.id)}
          >
            加入購物車
          </button>
        </div>
      </div>
      <ReactToast />
    </div>
  );
};

export default SingleProduct;
