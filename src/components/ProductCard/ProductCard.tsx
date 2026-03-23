import { observer } from "mobx-react-lite";
import type { Product } from "../../types";
import styles from "./ProductCard.module.scss";

interface Props {
  product: Product;
  onDetails?: () => void;
}

const ProductCard = observer(({ product, onDetails }: Props) => {
  return (
    <article className={styles.card} onClick={onDetails}>
      <div className={styles.imageWrap}>
        <img
          src={product.image}
          alt={product.name}
          className={styles.image}
          loading="lazy"
        />
        {product.popular && <span className={styles.popularBadge}>Хит</span>}
      </div>

      <div className={styles.body}>
        <div className={styles.infoRow}>
          <span className={styles.name}>{product.name}</span>
          <span className={styles.price}>
            {product.pricePerSqm === 0
              ? "По заявке"
              : `от ${product.pricePerSqm.toLocaleString("ru-RU")} руб/м²`}
          </span>
        </div>
        <button
          className={styles.detailsBtn}
          onClick={(e) => {
            e.stopPropagation();
            onDetails?.();
          }}
        >
          Подробнее
        </button>
      </div>
    </article>
  );
});

export default ProductCard;
