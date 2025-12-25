
import { DistributionRecord, Product } from '../types';

const RECORDS_KEY = 'distribution_records_v2';
const PRODUCTS_KEY = 'distribution_products_v2';

// Default products if none exist
const DEFAULT_PRODUCTS: Product[] = [
  { id: 'p1', name: 'کالای اساسی نوع ۱' },
  { id: 'p2', name: 'بسته معیشتی رمضان' }
];

// Record methods
export const getRecords = (): DistributionRecord[] => {
  const data = localStorage.getItem(RECORDS_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveRecords = (newRecords: DistributionRecord[]): void => {
  const records = getRecords();
  localStorage.setItem(RECORDS_KEY, JSON.stringify([...records, ...newRecords]));
};

export const findAllByNationalId = (nationalId: string): DistributionRecord[] => {
  return getRecords().filter(r => r.nationalId === nationalId);
};

// Product methods
export const getProducts = (): Product[] => {
  const data = localStorage.getItem(PRODUCTS_KEY);
  if (!data) {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(DEFAULT_PRODUCTS));
    return DEFAULT_PRODUCTS;
  }
  return JSON.parse(data);
};

export const saveProducts = (products: Product[]): void => {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
};

export const addProduct = (name: string): Product => {
  const products = getProducts();
  const newProduct = { id: Math.random().toString(36).substr(2, 9), name };
  saveProducts([...products, newProduct]);
  return newProduct;
};

export const deleteProduct = (id: string): void => {
  const products = getProducts().filter(p => p.id !== id);
  saveProducts(products);
};

export const updateProduct = (id: string, name: string): void => {
  const products = getProducts().map(p => p.id === id ? { ...p, name } : p);
  saveProducts(products);
};
