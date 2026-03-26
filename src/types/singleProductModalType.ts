import type { Product } from "./cartProductType";

export type SingleProductModalType = {
  closeModal: () => void;
  product: Product | undefined;
  addCart: (id: string, num: number) => Promise<void>;
};
