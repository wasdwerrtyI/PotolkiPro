import styles from "./BrandsGuide.module.scss";

const TIERS = [
  {
    flag: "🇨🇳",
    origin: "Китай",
    label: "Бюджет",
    price: "от 950 ₽/м²",
    color: "budget",
    brands: ["DeckStar", "AP Stretchy", "Albico"],
    pros: [
      "Самая доступная цена",
      "Большой выбор цветов и фактур",
      "Быстрые сроки поставки",
    ],
    cons: [
      "Может иметь запах первые 1–2 недели",
      "Толщина плёнки ниже (0,17–0,22 мм)",
      "Гарантия 10–12 лет",
    ],
    note: "Оптимально для бюджетного ремонта, съёмного жилья или нежилых помещений.",
  },
  {
    flag: "🇷🇺",
    origin: "Россия",
    label: "Средний сегмент",
    price: "от 1 100 ₽/м²",
    color: "mid",
    brands: ["Фолиопласт", "Newmat Россия", "Техникс"],
    pros: [
      "Производство по европейским стандартам",
      "Без запаха — соответствует ГОСТ",
      "Толщина 0,22–0,27 мм",
    ],
    cons: [
      "Выбор цветов чуть уже, чем у европейцев",
      "Средняя цена выше китайского",
    ],
    note: "Золотая середина: подходит для квартир, домов и офисов при разумном бюджете.",
  },
  {
    flag: "🇧🇪🇩🇪",
    origin: "Европа",
    label: "Премиум",
    price: "от 1 400 ₽/м²",
    color: "premium",
    brands: ["Lackfolie (DE)", "Renolit (DE)", "Pongs (BE)"],
    pros: [
      "Экологический сертификат (M1 / EN 13501)",
      "Толщина 0,27–0,35 мм — прочнее",
      "Гарантия 15–25 лет",
    ],
    cons: [
      "Дороже аналогов",
      "Дольше ждать под заказ (4–10 дней)",
    ],
    note: "Рекомендуем для детских комнат, аллергиков и объектов с высокими требованиями.",
  },
];

const BrandsGuide = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.head}>
          <p className={styles.eyebrow}>Производители</p>
          <h2 className={styles.title}>За что вы платите?</h2>
          <p className={styles.subtitle}>
            Цена натяжного потолка зависит прежде всего от страны производства
            плёнки. Разберём три сегмента — чтобы вы выбрали то, что нужно именно вам.
          </p>
        </div>

        <div className={styles.grid}>
          {TIERS.map((tier) => (
            <div key={tier.origin} className={`${styles.card} ${styles[tier.color]}`}>
              <div className={styles.cardHeader}>
                <span className={styles.flag}>{tier.flag}</span>
                <div>
                  <p className={styles.cardLabel}>{tier.label}</p>
                  <p className={styles.cardOrigin}>{tier.origin}</p>
                </div>
                <span className={styles.cardPrice}>{tier.price}</span>
              </div>

              <div className={styles.brands}>
                {tier.brands.map((b) => (
                  <span key={b} className={styles.brand}>{b}</span>
                ))}
              </div>

              <div className={styles.lists}>
                <ul className={styles.pros}>
                  {tier.pros.map((p) => (
                    <li key={p}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      {p}
                    </li>
                  ))}
                </ul>
                <ul className={styles.cons}>
                  {tier.cons.map((c) => (
                    <li key={c}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                      {c}
                    </li>
                  ))}
                </ul>
              </div>

              <p className={styles.note}>{tier.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandsGuide;
