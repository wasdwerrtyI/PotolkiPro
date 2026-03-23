export type ProductCategory =
  | "matte"
  | "glossy"
  | "satin"
  | "fabric"
  | "multilevel"
  | "floating"
  | "backlit"
  | "photo"
  | "service";

export type FilterSection =
  | "all"
  | "material"
  | "texture"
  | "construction"
  | "design"
  | "mounting";

export const SECTION_LABELS: Record<FilterSection, string> = {
  all: "Все",
  material: "По материалу",
  texture: "По фактуре",
  construction: "По конструкции",
  design: "По дизайну",
  mounting: "Услуги",
};

export const SECTION_CATEGORIES: Record<
  FilterSection,
  ProductCategory[] | null
> = {
  all: null,
  material: ["matte", "glossy", "satin", "fabric"],
  texture: ["matte", "glossy", "satin"],
  construction: ["multilevel", "floating"],
  design: ["photo", "backlit"],
  mounting: ["service"],
};

export const CATEGORY_LABELS: Record<ProductCategory, string> = {
  matte: "Матовые",
  glossy: "Глянцевые",
  satin: "Сатиновые",
  fabric: "Тканевые",
  multilevel: "Многоуровневые",
  floating: "Парящие",
  backlit: "С подсветкой",
  photo: "Фотопечать",
  service: "Услуга",
};

export type RoomType =
  | "living"
  | "bedroom"
  | "kitchen"
  | "bathroom"
  | "kids"
  | "hallway";

export const ROOM_LABELS: Record<RoomType, string> = {
  living: "Гостиная",
  bedroom: "Спальня",
  kitchen: "Кухня",
  bathroom: "Ванная",
  kids: "Детская",
  hallway: "Прихожая",
};

export interface ProductParameter {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  pricePerSqm: number;
  image: string;
  category: ProductCategory;
  rooms?: RoomType[];
  parameters: ProductParameter[];
  popular?: boolean;
  features?: string[];
}

export interface CartItem {
  product: Product;
  sqm: number;
}
