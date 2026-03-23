import { observer } from "mobx-react-lite";
import { cartStore } from "../../stores/cartStore";
import styles from "./Header.module.scss";

const Header = observer(() => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <span className={styles.logoIcon}>◆</span>
          <span className={styles.logoText}>ПотолокПро</span>
        </div>

        <nav className={styles.nav}>
          <a href="#catalog" className={styles.navLink}>
            Каталог
          </a>
          <a href="#gallery" className={styles.navLink}>
            Наши работы
          </a>
          <a href="#advantages" className={styles.navLink}>
            Преимущества
          </a>
          <a href="#contacts" className={styles.navLink}>
            Контакты
          </a>
        </nav>

        <a href="#calculator" className={styles.calcBtn}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="4" y="2" width="16" height="20" rx="2" />
            <line x1="8" y1="6" x2="16" y2="6" />
            <line x1="8" y1="10" x2="10" y2="10" />
            <line x1="14" y1="10" x2="16" y2="10" />
            <line x1="8" y1="14" x2="10" y2="14" />
            <line x1="14" y1="14" x2="16" y2="14" />
            <line x1="8" y1="18" x2="10" y2="18" />
            <line x1="14" y1="18" x2="16" y2="18" />
          </svg>
          Калькулятор
        </a>

        <button
          className={styles.cartBtn}
          onClick={() => cartStore.openCart()}
          aria-label="Открыть корзину"
        >
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          <span className={styles.cartLabel}>Корзина</span>
          {cartStore.count > 0 && (
            <span className={styles.cartBadge}>{cartStore.count}</span>
          )}
        </button>
      </div>
    </header>
  );
});

export default Header;
