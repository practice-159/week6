import * as bootstrap from "bootstrap";
import { useForm } from "react-hook-form";
import axios, { isAxiosError } from "axios";
import { useDebouncedCallback } from "use-debounce";
import { useRef, useState, useEffect } from "react";
import { RotatingLines } from "react-loader-spinner";

import type { FormDataType } from "../../types/formDataType";
import type { Root, Product } from "../../types/cartProductType";

import { currency } from "../../utils/filter";
import ReactToast from "../../components/ReactToast";
import { errorNotify, successNotify } from "../../utils/toast";
import SingleProductModal from "../../components/SingleProductModal";

const API_PATH = import.meta.env.VITE_API_PATH;
const API_BASE_URL = import.meta.env.VITE_API_BASE;

const Checkout = () => {
  const [product, setProduct] = useState<Product>(); // 單一產品詳細資料
  const [products, setProducts] = useState<Product[]>(); // 產品列表
  const [cart, setCart] = useState<Root>(); // 購物車
  const [loadingState, setLoadingState] = useState(""); // 產品列表的按鈕載入狀態
  const productModalRef = useRef<bootstrap.Modal | null>(null); // 產品modal

  // week5 - 更新購物車
  const updateCart = async (
    cartId: string,
    productId: string,
    qty: number = 1,
  ) => {
    // const [debounceQty] = useDebounce(qty, 1000);
    const data = {
      qty: qty,
      product_id: productId,
    };
    try {
      const url = `${API_BASE_URL}/v2/api/${API_PATH}/cart/${cartId}`;
      const response = await axios.put(url, { data });
      successNotify(response.data.message);
      getCart();
    } catch (error) {
      if (isAxiosError(error)) {
        errorNotify(error.response?.data);
      }
    }
  };

  // debounce 避免修改購物車列表數量
  const debounceUpdateCart = useDebouncedCallback(
    (cartId: string, productId: string, qty: number = 1) => {
      updateCart(cartId, productId, qty);
    },
    500,
  );

  // 查看產品詳情
  const handleView = async (id: string) => {
    // navigate(`/product/${id}`);
    setLoadingState(id);
    try {
      const url = `${API_BASE_URL}/v2/api/${API_PATH}/product/${id}`;
      const response = await axios.get(url);
      setProduct(response.data.product);
      productModalRef.current?.show();
    } catch (error) {
      if (isAxiosError(error)) {
        errorNotify(error.response?.data.message);
      }
    } finally {
      setLoadingState("");
    }
  };

  // 刷新購物車
  const getCart = async () => {
    try {
      const url = `${API_BASE_URL}/v2/api/${API_PATH}/cart`;
      const response = await axios.get(url);
      setCart(response.data.data);
    } catch (error) {
      if (isAxiosError(error)) {
        errorNotify(error.response?.data);
      }
    }
  };

  // 加入購物車
  const addCart = async (id: string, num: number = 1) => {
    const data = {
      qty: num,
      product_id: id,
    };
    try {
      setLoadingState(id);
      const url = `${API_BASE_URL}/v2/api/${API_PATH}/cart`;
      const response = await axios.post(url, { data });
      successNotify(response.data.message);
      getCart();
    } catch (error) {
      if (isAxiosError(error)) {
        errorNotify(error.response?.data.message);
      }
    } finally {
      setLoadingState("");
    }
  };

  // week5 - 刪除購物車(單項)
  const removeCart = async (id: string) => {
    try {
      const url = `${API_BASE_URL}/v2/api/${API_PATH}/cart/${id}`;
      const response = await axios.delete(url);
      successNotify(response.data.message);
      getCart();
    } catch (error) {
      if (isAxiosError(error)) {
        errorNotify(error.response?.data);
      }
    }
  };

  // week5 - 清空購物車
  const removeCartAll = async () => {
    try {
      const url = `${API_BASE_URL}/v2/api/${API_PATH}/carts`;
      const response = await axios.delete(url);
      successNotify(response.data.message);
      getCart();
    } catch (error) {
      if (isAxiosError(error)) {
        errorNotify(error.response?.data);
      }
    }
  };

  useEffect(() => {
    // 第一次載入先刷新購物車
    (async () => {
      await getCart();
    })();

    // 刷新產品列表
    const getProducts = async () => {
      try {
        const url = `${API_BASE_URL}/v2/api/${API_PATH}/products`;
        const response = await axios.get(url);
        setProducts(response.data.products);
      } catch (error) {
        if (isAxiosError(error)) {
          errorNotify(error.response?.data);
        }
      }
    };
    getProducts();

    // modal初始化
    productModalRef.current = new bootstrap.Modal("#productModal");
    // modal 關閉時移除焦點
    document
      .querySelector("#productModal")
      ?.addEventListener("hide.bs.modal", () => {
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
        }
      });
  }, []);

  // 關閉 modal
  const closeModal = () => {
    productModalRef.current?.hide();
  };

  // 送出訂單
  const onSubmit = async (formData: FormDataType) => {
    try {
      const data = {
        data: {
          message: formData.message,
          user: {
            tel: formData.tel,
            name: formData.name,
            email: formData.email,
            address: formData.address,
          },
        },
      };
      const url = `${API_BASE_URL}/v2/api/${API_PATH}/order`;
      const res = await axios.post(url, data);
      getCart();
      successNotify(res.data.message);
      reset(); // 送出後清空表單
    } catch (error) {
      if (isAxiosError(error)) {
        errorNotify(error.response?.data.message);
      }
    }
  };

  // react-hook-form
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormDataType>({ mode: "onChange" });

  return (
    <>
      <div className="container">
        {/* 產品列表 */}
        <table className="table align-middle">
          <thead>
            <tr>
              <th>圖片</th>
              <th>商品名稱</th>
              <th>價格</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product) => {
              return (
                <tr key={product.id}>
                  <td style={{ width: "200px" }}>
                    <div
                      style={{
                        height: "100px",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundImage: `url(${product.imageUrl})`,
                      }}
                    ></div>
                  </td>
                  <td>{product.title}</td>
                  <td>
                    <del className="h6">原價：{product.origin_price}</del>
                    <div className="h5">特價：{product.price}</div>
                  </td>
                  <td>
                    <div className="btn-group btn-group-sm">
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        disabled={loadingState === product.id}
                        onClick={() => {
                          handleView(product.id);
                        }}
                      >
                        {loadingState === product.id ? (
                          <RotatingLines width={50} height={16} color="grey" />
                        ) : (
                          "查看更多"
                        )}
                      </button>
                      <button
                        type="button"
                        className="btn btn-outline-danger"
                        onClick={() => addCart(product.id)}
                        disabled={loadingState === product.id}
                      >
                        {loadingState === product.id ? (
                          <RotatingLines width={80} height={16} color="grey" />
                        ) : (
                          "加到購物車"
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* 購物車列表 */}
        <h2>購物車列表</h2>
        <div className="mt-4 text-end">
          <button
            type="button"
            disabled={!cart?.carts?.length}
            className="btn btn-outline-danger"
            onClick={() => {
              removeCartAll();
            }}
          >
            清空購物車
          </button>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col"></th>
              <th scope="col">品名</th>
              <th scope="col">數量/單位</th>
              <th scope="col">小計</th>
            </tr>
          </thead>
          <tbody>
            {cart?.carts?.map((cartItem) => (
              <tr key={cartItem.id}>
                <td>
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => {
                      removeCart(cartItem.id);
                    }}
                  >
                    刪除
                  </button>
                </td>
                <th scope="row">{cartItem.product.title}</th>
                <td>
                  <div className="input-group mb-3">
                    <input
                      min={1}
                      type="number"
                      aria-label="數量"
                      placeholder="數量"
                      className="form-control"
                      defaultValue={cartItem.qty}
                      aria-describedby="basic-addon1"
                      onChange={(e) => {
                        // updateCart(
                        debounceUpdateCart(
                          cartItem.id,
                          cartItem.product_id,
                          Number(e.target.value),
                        );
                      }}
                    />
                    <span id="basic-addon1" className="input-group-text">
                      {cartItem.product.unit}
                    </span>
                  </div>
                </td>
                <td className="text-end">{currency(cartItem.final_total)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3} className="text-end">
                總計
              </td>
              <td className="text-start">{currency(cart?.final_total)}</td>
            </tr>
          </tfoot>
        </table>

        {/* 第6次主線 */}
        {/* 結帳頁面 */}
        <div className="my-5 row justify-content-center">
          <form className="col-md-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                id="email"
                {...register("email", {
                  required: { value: true, message: "信箱必填" },
                  pattern: {
                    value: /^\S+@\S+$/,
                    message: "Email格式不正確",
                  },
                })}
                type="email"
                placeholder="請輸入 Email"
                className="form-control"
              />
              {errors.email && (
                <p className="text-danger">{errors.email.message as string}</p>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                收件人姓名
              </label>
              <input
                id="name"
                {...register("name", {
                  required: { value: true, message: "請輸入姓名" },
                  minLength: { value: 2, message: "姓名至少2個字" },
                })}
                type="text"
                placeholder="請輸入姓名"
                className="form-control"
              />
              {errors.name && (
                <p className="text-danger">{errors.name.message as string}</p>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="tel" className="form-label">
                收件人電話
              </label>
              <input
                id="tel"
                {...register("tel", {
                  required: "請輸入收件人電話",
                  minLength: { value: 8, message: "電話至少8碼" },
                  pattern: { value: /^\d+$/, message: "電話只能輸入數字" },
                })}
                type="tel"
                placeholder="請輸入電話"
                className="form-control"
              />
              {errors.tel && (
                <p className="text-danger">{errors.tel.message as string}</p>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                收件人地址
              </label>
              <input
                type="text"
                id="address"
                {...register("address", { required: "請輸入收件人地址" })}
                placeholder="請輸入地址"
                className="form-control"
              />
              {errors.address && (
                <p className="text-danger">
                  {errors.address.message as string}
                </p>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="message" className="form-label">
                留言
              </label>
              <textarea
                cols={30}
                rows={10}
                id="message"
                className="form-control"
                {...register("message")}
              ></textarea>
            </div>
            <div className="text-end">
              <button
                type="submit"
                disabled={!isValid}
                className="btn btn-danger"
              >
                送出訂單
              </button>
            </div>
          </form>
        </div>
      </div>
      <ReactToast />
      <SingleProductModal
        product={product}
        addCart={addCart}
        closeModal={closeModal}
      />
    </>
  );
};

export default Checkout;
