import { createContext } from 'react';

type Product = {
  id: string;
  name: string;
  size: number;
  price: number;
}

type ProductC = {
  products?: Product[],
  setProducts?: (products: Product[]) => void
}

export const ProductContext = createContext<ProductC>({})