import { observer } from "mobx-react-lite";
import { useState } from "react";
import { catalogStore } from "./stores/catalogStore";
import type { Product } from "./types";
import Header from "./components/Header/Header";
import Hero from "./components/Hero/Hero";
import CategoryFilter from "./components/CategoryFilter/CategoryFilter";
import ProductCard from "./components/ProductCard/ProductCard";
import CartSidebar from "./components/CartSidebar/CartSidebar";
import ProductModal from "./components/ProductModal/ProductModal";
import PriceCalculator from "./components/PriceCalculator/PriceCalculator";
import Advantages from "./components/Advantages/Advantages";
import Contacts from "./components/Contacts/Contacts";
import styles from "./App.module.scss";

const App = observer(() => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  return (
    <div className={styles.app}>
      <Header />

      <main>
        <Hero />

        <section id="catalog" className={styles.catalog}>
          <div className={styles.catalogHeader}>
            <div className={styles.container}>
              <h2 className={styles.catalogTitle}>Каталог</h2>
              <p className={styles.catalogDesc}>
                Представлены наиболее популярные виды натяжных потолков —
                глянцевые, матовые, сатиновые, тканевые, парящие, контурные,
                световые линии и другие. Замер бесплатно.
              </p>
            </div>
          </div>
          <CategoryFilter />

          <div className={styles.catalogContent}>
            <div className={styles.container}>
              <div className={styles.grid}>
                {catalogStore.filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onDetails={() => setSelectedProduct(product)}
                  />
                ))}
              </div>

              {catalogStore.filteredProducts.length === 0 && (
                <div className={styles.empty}>
                  <p>Товары в этой категории не найдены</p>
                </div>
              )}
            </div>
          </div>
        </section>

        <PriceCalculator />
        <Advantages />
        <Contacts />
      </main>

      <footer className={styles.footer}>
        <div className={styles.container}>
          <span>
            © {new Date().getFullYear()} ПотолокПро. Все права защищены.
          </span>
        </div>
      </footer>

      <CartSidebar />
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
});

export default App;
