import { useState } from "react";

import type { SingleProductModalType } from "../types/singleProductModalType";

const SingleProductModal = ({
  product,
  addCart,
  closeModal,
}: SingleProductModalType) => {
  const [cartQty, setCartQty] = useState(1);

  return (
    <div className="modal" id="productModal">
      <div className="modal-dialog">
        <div className="modal-content">
          {product && (
            <>
              <div className="modal-header">
                <h5 className="modal-title">產品名稱：{product.title}</h5>
                <button
                  type="button"
                  aria-label="Close"
                  className="btn-close"
                  onClick={() => {
                    closeModal();
                    setCartQty(1);
                  }}
                ></button>
              </div>
              <div className="modal-body">
                <img alt="產品圖片" className="w-100" src={product.imageUrl} />
                <p className="mt-3">產品內容：{product.content}</p>
                <p>產品描述：{product.description}</p>
                <p>
                  價錢：<del>原價 ${product.origin_price}</del>，特價：$
                  {product.price}
                </p>
                <div className="d-flex align-items-center">
                  <label style={{ width: "150px" }}>
                    購買數量：{product.unit}
                  </label>
                  <button
                    type="button"
                    id="button-addon1"
                    className="btn btn-danger"
                    aria-label="Increase quantity"
                    onClick={() => {
                      setCartQty((pre) => (pre < 2 ? 1 : pre - 1));
                    }}
                  >
                    <i className="fa-solid fa-minus"></i>
                  </button>
                  <input
                    min="1"
                    max="10"
                    type="number"
                    value={cartQty}
                    className="form-control"
                    onChange={(e) => {
                      setCartQty(
                        Number(e.target.value) < 1
                          ? 1
                          : Number(e.target.value) > 9
                            ? 10
                            : Number(e.target.value),
                      );
                    }}
                  />
                  <button
                    type="button"
                    id="button-addon2"
                    className="btn btn-primary"
                    aria-label="Decrease quantity"
                    onClick={() => {
                      setCartQty((pre) => (pre > 9 ? 10 : pre + 1));
                    }}
                  >
                    <i className="fa-solid fa-plus"></i>
                  </button>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => {
                    addCart(product.id, cartQty);
                    closeModal();
                    setCartQty(1);
                  }}
                >
                  加入購物車
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleProductModal;
