import { useState } from "react";
import { observer } from "mobx-react-lite";
import { cartStore } from "../../stores/cartStore";
import OrderModal from "../OrderModal/OrderModal";
import styles from "./CartSidebar.module.scss";

const CartSidebar = observer(() => {
  const [orderOpen, setOrderOpen] = useState(false);

  const handleOrder = () => {
    setOrderOpen(true);
  };

  return (
    <>
      {cartStore.isOpen && (
        <div className={styles.overlay} onClick={() => cartStore.closeCart()} />
      )}

      <aside
        className={`${styles.sidebar} ${cartStore.isOpen ? styles.open : ""}`}
      >
        <div className={styles.header}>
          <h2 className={styles.title}>
            Корзина
            {cartStore.count > 0 && (
              <span className={styles.count}>{cartStore.count}</span>
            )}
          </h2>
          <button
            className={styles.closeBtn}
            onClick={() => cartStore.closeCart()}
            aria-label="Закрыть корзину"
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
        </div>

        {cartStore.items.length === 0 ? (
          <div className={styles.empty}>
            <svg
              width="56"
              height="56"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <p>Корзина пуста</p>
            <span>Добавьте понравившиеся потолки</span>
          </div>
        ) : (
          <>
            <div className={styles.items}>
              {cartStore.items.map((item) => (
                <div key={item.product.id} className={styles.item}>
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className={styles.itemImage}
                  />
                  <div className={styles.itemInfo}>
                    <p className={styles.itemName}>{item.product.name}</p>
                    {item.product.category === "service" ? (
                      <p className={styles.itemUnit}>По заявке</p>
                    ) : (
                      <>
                        <p className={styles.itemUnit}>
                          {item.product.pricePerSqm.toLocaleString("ru-RU")}{" "}
                          ₽/м²
                        </p>
                        <div className={styles.itemRow}>
                          <div className={styles.itemCounter}>
                            <button
                              className={styles.itemCounterBtn}
                              onClick={() =>
                                cartStore.updateSqm(
                                  item.product.id,
                                  item.sqm - 1,
                                )
                              }
                              aria-label="Уменьшить"
                            >
                              −
                            </button>
                            <span className={styles.itemSqm}>
                              {item.sqm} м²
                            </span>
                            <button
                              className={styles.itemCounterBtn}
                              onClick={() =>
                                cartStore.updateSqm(
                                  item.product.id,
                                  item.sqm + 1,
                                )
                              }
                              aria-label="Увеличить"
                            >
                              +
                            </button>
                          </div>
                          <span className={styles.itemTotal}>
                            {(
                              item.product.pricePerSqm * item.sqm
                            ).toLocaleString("ru-RU")}{" "}
                            ₽
                          </span>
                        </div>
                      </>
                    )}
                  </div>

                  <button
                    className={styles.removeBtn}
                    onClick={() => cartStore.removeItem(item.product.id)}
                    aria-label="Удалить из корзины"
                  >
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
                      <line x1="18" y1="6" x2="6" y2="18" />
                      <line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>

            <div className={styles.footer}>
              <div className={styles.summary}>
                <div className={styles.summaryRow}>
                  <span>Площадь</span>
                  <span>{cartStore.totalSqm} м²</span>
                </div>
                <div className={`${styles.summaryRow} ${styles.summaryTotal}`}>
                  <span>Итого</span>
                  <span>{cartStore.total.toLocaleString("ru-RU")} ₽</span>
                </div>
              </div>

              <button className={styles.orderBtn} onClick={handleOrder}>
                Оформить заявку
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>

              <button
                className={styles.clearBtn}
                onClick={() => cartStore.clear()}
              >
                Очистить корзину
              </button>
            </div>
          </>
        )}
      </aside>

      {orderOpen && <OrderModal onClose={() => setOrderOpen(false)} />}
    </>
  );
});

export default CartSidebar;
