import styles from "./Hero.module.scss";

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.overlay} />
      <div className={styles.content}>
        <p className={styles.tagline}>Профессиональный монтаж за 1 день</p>
        <h1 className={styles.title}>
          Натяжные потолки
          <br />
          для вашего дома
        </h1>
        <p className={styles.subtitle}>
          Более 200 оттенков и фактур. Гарантия до 15 лет. Замер бесплатно.
        </p>
        <div className={styles.ctaGroup}>
          <a href="#catalog" className={styles.cta}>
            Смотреть каталог
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
          </a>
          <a href="#calculator" className={styles.ctaSecondary}>
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
            Рассчитать цену
          </a>
        </div>
      </div>

      <div className={styles.stats}>
        <div className={styles.statItem}>
          <span className={styles.statValue}>100+</span>
          <span className={styles.statLabel}>оттенков</span>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.statItem}>
          <span className={styles.statValue}>1 день</span>
          <span className={styles.statLabel}>монтаж</span>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.statItem}>
          <span className={styles.statValue}>15 лет</span>
          <span className={styles.statLabel}>гарантия</span>
        </div>
        <div className={styles.statDivider} />
        <div className={styles.statItem}>
          <span className={styles.statValue}>0 ₽</span>
          <span className={styles.statLabel}>замер</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;
