import type { Modal } from "bootstrap";

import type { ProductType } from "./productType";

export type tableType = {
  productList: ProductType[];
  INITIAL_TEMPLATE_DATA: ProductType;
  productModal: React.RefObject<Modal | null>;
  setModalType: React.Dispatch<React.SetStateAction<string>>;
  setTemplateData: React.Dispatch<React.SetStateAction<ProductType>>;
};
