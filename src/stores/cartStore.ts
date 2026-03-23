import { makeAutoObservable } from "mobx";
import type { CartItem, Product } from "../types";

class CartStore {
  items: CartItem[] = [];
  isOpen: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  addItem(product: Product, sqm: number) {
    const existing = this.items.find((i) => i.product.id === product.id);
    if (existing) {
      existing.sqm += sqm;
    } else {
      this.items.push({ product, sqm });
    }
  }

  removeItem(productId: string) {
    this.items = this.items.filter((i) => i.product.id !== productId);
  }

  updateSqm(productId: string, sqm: number) {
    const item = this.items.find((i) => i.product.id === productId);
    if (item) {
      if (sqm <= 0) {
        this.removeItem(productId);
      } else {
        item.sqm = sqm;
      }
    }
  }

  clear() {
    this.items = [];
  }

  openCart() {
    this.isOpen = true;
  }

  closeCart() {
    this.isOpen = false;
  }

  get total(): number {
    return this.items.reduce(
      (sum, item) => sum + item.product.pricePerSqm * item.sqm,
      0,
    );
  }

  get count(): number {
    return this.items.length;
  }

  get totalSqm(): number {
    return this.items.reduce((sum, item) => sum + item.sqm, 0);
  }
}

export const cartStore = new CartStore();
