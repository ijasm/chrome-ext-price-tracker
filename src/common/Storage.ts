import { Product } from "./Product";
import { MessageType, sendMessage } from "./Message";

export interface IStorage {
  products: Product[];
}

export const addProductToStorage = (product: Product) => {
  chrome.storage.sync.get(null, (response: IStorage) => {
    const storage = response;
    storage.products.push(product);
    chrome.storage.sync.set(storage, () => {
      // TODO: check runtime.lasterror
      sendMessage(MessageType.ProductTracked);
    });
  });
};

export const isProductInStorage = (productURL: string, callback: (response: boolean) => void) => {
  chrome.storage.sync.get(null, (storage: IStorage) => {
    callback(storage.products.find((product: Product) => {
      return product.url === productURL;
    }) !== undefined);
  });
};
