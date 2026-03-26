import type { ProductType } from "../types/productType";

type CardProps = {
  selectedProduct: ProductType;
};

const Card = ({ selectedProduct }: CardProps) => {
  return (
    <div className="card w-100">
      <img
        alt={selectedProduct.title}
        src={selectedProduct.imageUrl}
        className="card-img-top top-img "
      />
      <div className="card-body">
        <div className="card-title fs-1">{selectedProduct.title}</div>
        <p className="card-text">商品描述：{selectedProduct.description}</p>
        <p className="card-text">商品內容：{selectedProduct.content}</p>
        <p className="card-text">
          原價 ： <s>{selectedProduct.origin_price} </s> / 特價 :{" "}
          {selectedProduct.price} 元
        </p>
        <div className="card-text">
          <p className="fs-3">更多圖片：</p>
          {selectedProduct.imagesUrl.map((img: string, index: number) => {
            return (
              <img
                src={img}
                key={index}
                alt={selectedProduct.title}
                className="img-thumbnail w-25"
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Card;
