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

  const galleryImages = [
    "https://sun9-67.vkuserphoto.ru/s/v1/ig2/TiQyTyiEWHepvU6lsaTI_e6aPcYjZVx-Odcg9BjPUoUNSsNiHDhrHhJjQUk8mgc2hvCAod4xWtNn_Bc_1NOKjjz4.jpg?quality=95&as=32x24,48x36,72x54,108x81,160x120,240x180,360x270,480x360,540x405,640x480,720x540,1080x810,1280x960,1333x1000&from=bu&cs=1333x0",
    "https://sun9-3.vkuserphoto.ru/s/v1/ig2/pWP35IIjEd--3N9EkTSxsqqRIWFIviT54HooWhvfkdZh07gsn1mvYyF7Fb-3LDeKxxwHNEJBt3nuAf2fXtG1GIJB.jpg?quality=95&as=32x24,48x36,72x54,108x81,160x120,240x180,360x270,480x360,540x405,640x480,720x540,1080x810,1280x960,1440x1080,1920x1440&from=bu&cs=1920x0",
    "https://sun9-27.vkuserphoto.ru/s/v1/ig2/zbLARZ1BzZZyuy-pmCGgNUZCUji0wi25VBFwsEQCSbhyiIO5yfMEs7V7TGuWV3MR3HkCUIfdtISbF0YSqezJtbFR.jpg?quality=96&as=32x57,48x85,72x128,108x192,160x284,240x427,360x640,480x853,540x960,640x1138,720x1280,900x1600&from=bu&u=C8JHzZ6XeLtbcyGNIsqy7FhkAYvBBGFCbVCeTKHskF0&cs=900x0",
    "https://sun9-10.vkuserphoto.ru/s/v1/ig2/ULVg81mAa8boPPEkaAgHr6wZqMrO5IeHI2vMfRE6T8O-Rq0J8kuI16jz-v7JheOmM_Arn8VbQkwJGlRf1fiT8clx.jpg?quality=96&as=32x57,48x85,72x128,108x192,160x284,240x427,360x640,480x853,540x960,640x1138,720x1280,900x1600&from=bu&cs=900x0",
    "https://sun9-68.vkuserphoto.ru/s/v1/ig2/37GZbEvCC2PEfUo5g6ForLslSNX-xopbtUEO3ZtJ3w3JseV6GNizK3nnXybAzXJFJUthmwZ0-Yz7M0aVhPho-P3W.jpg?quality=96&as=32x57,48x85,72x128,108x192,160x284,240x427,360x640,480x853,540x960,640x1138,720x1280,900x1600&from=bu&cs=900x0",
    "https://sun9-35.vkuserphoto.ru/s/v1/ig2/rnIwkwAjYhjie05En2l1Q9vO1IxgndaxA52KcDiU2U8mhy1FaPnD414P-z5_CC613QjJuFfhvMVuMdnrW66vdewF.jpg?quality=96&as=32x57,48x85,72x128,108x192,160x284,240x427,360x640,480x853,540x960,640x1138,720x1280,900x1600&from=bu&cs=900x0",
  ];

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

        <section
          id="gallery"
          style={{
            padding: "80px 0",
            background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
          }}
        >
          <div className={styles.container}>
            <h2
              style={{
                fontSize: "48px",
                fontWeight: 800,
                textAlign: "center",
                marginBottom: "16px",
                background: "linear-gradient(135deg, #0f1b2d 0%, #667eea 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Наши работы
            </h2>
            <p
              style={{
                textAlign: "center",
                fontSize: "18px",
                color: "#64748b",
                marginBottom: "60px",
              }}
            >
              Более 100 выполненных проектов по РТ
            </p>
            <div className={styles.grid}>
              {galleryImages.map((img, i) => (
                <div
                  key={i}
                  style={{
                    borderRadius: "16px",
                    overflow: "hidden",
                    aspectRatio: "4/3",
                  }}
                >
                  {img ? (
                    <img
                      src={img}
                      alt={`Работа ${i + 1}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <div
                      style={{
                        width: "100%",
                        height: "100%",
                        background:
                          "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        opacity: 0.3,
                      }}
                    >
                      <svg
                        width="64"
                        height="64"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <rect
                          x="3"
                          y="3"
                          width="18"
                          height="18"
                          rx="2"
                          ry="2"
                        />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <polyline points="21 15 16 10 5 21" />
                      </svg>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

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
