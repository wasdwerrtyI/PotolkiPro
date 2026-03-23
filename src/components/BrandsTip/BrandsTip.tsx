import { useState } from "react";
import styles from "./BrandsTip.module.scss";

const BRANDS = [
  {
    name: "Classic",
    tag: "Бюджет",
    desc: "Базовая ПВХ. Стандартные помещения, минимальный бюджет.",
  },
  {
    name: "Bauf",
    tag: "Бюджет",
    desc: "Широкая палитра, хорошая цена. Квартиры и офисы.",
  },
  {
    name: "Premium",
    tag: "Средний",
    desc: "Плотнее, насыщеннее цвет, меньше запах. Жилые комнаты.",
  },
  {
    name: "Evolution",
    tag: "Средний",
    desc: "Устойчив к УФ, не желтеет. Долгий срок службы.",
  },
  {
    name: "Teqtum KM2",
    tag: "Прочный",
    desc: "Армированная плёнка. Ванные, кухни, высокие нагрузки.",
  },
  {
    name: "Teqtum EURO",
    tag: "Эко",
    desc: "Экосертификат, минимальный запах. Детские комнаты.",
  },
  {
    name: "Cold Stretch",
    tag: "Тканевый",
    desc: "Монтаж без нагрева, морозостойкий. Дома и дачи.",
  },
  {
    name: "Lumfer",
    tag: "Световой",
    desc: "Светорассеивающее полотно для LED и световых линий.",
  },
];

const TAG_COLOR: Record<string, string> = {
  Бюджет: "#6b9e6b",
  Средний: "#c9a96e",
  Прочный: "#5a7fc9",
  Эко: "#5aab8f",
  Тканевый: "#a07cc5",
  Световой: "#c97a3a",
};

const TIPS = [
  { icon: "💰", q: "Небольшой бюджет", a: "Classic, Bauf" },
  { icon: "🏠", q: "Спальня / гостиная", a: "Premium, Evolution" },
  { icon: "🍳", q: "Кухня / ванная", a: "Teqtum KM2" },
  { icon: "👶", q: "Детская комната", a: "Teqtum EURO" },
  { icon: "🏡", q: "Загородный дом / дача", a: "Cold Stretch" },
  { icon: "💡", q: "Световые линии / LED", a: "Lumfer" },
];

const BrandsTip = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          <span className={styles.headerTitle}>Как выбрать производителя?</span>
        </div>
        <button className={styles.toggle} onClick={() => setOpen((v) => !v)}>
          {open ? "Скрыть" : "Показать"}
          <svg
            className={open ? styles.rotated : ""}
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      </div>

      {open && (
        <div className={styles.body}>
          <div className={styles.tips}>
            {TIPS.map((t) => (
              <div key={t.q} className={styles.tip}>
                <span className={styles.tipIcon}>{t.icon}</span>
                <span className={styles.tipQ}>{t.q}</span>
                <span className={styles.tipA}>{t.a}</span>
              </div>
            ))}
          </div>

          <p className={styles.dividerLabel}>Все производители</p>

          <div className={styles.grid}>
            {BRANDS.map((b) => (
              <div key={b.name} className={styles.card}>
                <div className={styles.cardTop}>
                  <span className={styles.cardName}>{b.name}</span>
                  <span
                    className={styles.cardTag}
                    style={{ color: TAG_COLOR[b.tag] }}
                  >
                    {b.tag}
                  </span>
                </div>
                <span className={styles.cardDesc}>{b.desc}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BrandsTip;
