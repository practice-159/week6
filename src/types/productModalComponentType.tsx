import type { AxiosInstance } from "axios";

import { Modal } from "bootstrap";

import type { ProductType } from "./productType";
export type productModalComponentType = {
  API_PATH: string;
  modalType: string;
  templateData: ProductType;
  axiosInstance: AxiosInstance;
  productModal: React.RefObject<Modal | null>;
  fetchProducts: (e?: number) => Promise<void>;
  productModalRef: React.RefObject<HTMLDivElement | null>;
};
