import { observer } from "mobx-react-lite";
import { cartStore } from "../../stores/cartStore";
import { CATEGORY_LABELS, ROOM_LABELS } from "../../types";
import type { Product } from "../../types";
import styles from "./ProductModal.module.scss";

interface Props {
  product: Product;
  onClose: () => void;
}

const ProductModal = observer(({ product, onClose }: Props) => {
  const inCart = cartStore.items.find((i) => i.product.id === product.id);

  const handleBackdrop = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className={styles.backdrop} onClick={handleBackdrop}>
      <div className={styles.modal}>
        <button
          className={styles.closeBtn}
          onClick={onClose}
          aria-label="Закрыть"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        <div className={styles.image}>
          <img src={product.image} alt={product.name} />
          {product.popular && <span className={styles.badge}>Популярное</span>}
        </div>

        <div className={styles.content}>
          <div className={styles.meta}>
            <span className={styles.categoryTag}>
              {CATEGORY_LABELS[product.category]}
            </span>
            {product.rooms &&
              product.rooms.map((r) => (
                <span key={r} className={styles.roomTag}>
                  {ROOM_LABELS[r]}
                </span>
              ))}
          </div>

          <h2 className={styles.name}>{product.name}</h2>
          <p className={styles.description}>{product.description}</p>

          {product.features && product.features.length > 0 && (
            <div className={styles.features}>
              {product.features.map((f) => (
                <span key={f} className={styles.feature}>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {f}
                </span>
              ))}
            </div>
          )}

          <div className={styles.params}>
            {product.parameters.map((p) => (
              <div key={p.label} className={styles.paramRow}>
                <span className={styles.paramLabel}>{p.label}</span>
                <span className={styles.paramValue}>{p.value}</span>
              </div>
            ))}
          </div>

          <div className={styles.footer}>
            <div className={styles.priceBlock}>
              <span className={styles.priceLabel}>
                {product.pricePerSqm === 0 ? "Стоимость" : "Цена за м²"}
              </span>
              <span className={styles.price}>
                {product.pricePerSqm === 0
                  ? "По заявке"
                  : `${product.pricePerSqm.toLocaleString("ru-RU")} ₽`}
              </span>
            </div>

            {inCart ? (
              <button className={styles.btnInCart} onClick={onClose}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                В корзине
              </button>
            ) : (
              <button
                className={styles.btnAdd}
                onClick={() => {
                  cartStore.addItem(product, 1);
                  cartStore.openCart();
                  onClose();
                }}
              >
                Добавить в заявку
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

export default ProductModal;
