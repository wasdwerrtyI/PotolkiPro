import { makeAutoObservable } from "mobx";
import type { Product, FilterSection } from "../types";
import { SECTION_CATEGORIES } from "../types";
import { products } from "../data/products";

class CatalogStore {
  products: Product[] = products;
  activeSection: FilterSection = "all";

  constructor() {
    makeAutoObservable(this);
  }

  setSection(section: FilterSection) {
    this.activeSection = section;
  }

  get filteredProducts(): Product[] {
    const cats = SECTION_CATEGORIES[this.activeSection];
    if (cats === null) return this.products;
    if (cats.length === 0) return [];
    return this.products.filter((p) => (cats as string[]).includes(p.category));
  }
}

export const catalogStore = new CatalogStore();
