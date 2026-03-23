import { useState, useMemo } from "react";
import { sendOrderToTelegram } from "../../services/telegram";
import styles from "./PriceCalculator.module.scss";

// ── Данные ──────────────────────────────────────────────────────────────────

type Texture = "glossy" | "matte" | "satin" | "fabric" | "textured";
type Manufacturer =
  | "classic"
  | "premium"
  | "evolution"
  | "coldstretch"
  | "teqtum_km2"
  | "bauf"
  | "teqtum_euro"
  | "lumfer";
type Color = "white" | "colored";
type Profile = "plastic" | "aluminum";
type Height = "low" | "mid" | "high";
type Status = "idle" | "loading" | "success" | "error";

const TEXTURE_LABELS: Record<Texture, string> = {
  glossy: "Глянцевый",
  matte: "Матовый",
  satin: "Сатиновый",
  fabric: "Тканевый",
  textured: "Фактурный",
};

const TEXTURE_BASE: Record<Texture, number> = {
  glossy: 450,
  matte: 350,
  satin: 400,
  fabric: 750,
  textured: 520,
};

const MFR_LABELS: Record<Manufacturer, string> = {
  classic: "Classic",
  premium: "Premium",
  evolution: "Evolution",
  coldstretch: "Cold Stretch",
  teqtum_km2: "Teqtum KM2",
  bauf: "Bauf",
  teqtum_euro: "Teqtum EURO",
  lumfer: "Lumfer",
};

const MFR_GUIDE = [
  { icon: "💰", q: "Небольшой бюджет", a: "Classic, Bauf" },
  { icon: "🏠", q: "Спальня / гостиная", a: "Premium, Evolution" },
  { icon: "🍳", q: "Кухня / ванная", a: "Teqtum KM2" },
  { icon: "👶", q: "Детская комната", a: "Teqtum EURO" },
  { icon: "🏡", q: "Загородный дом / дача", a: "Cold Stretch" },
  { icon: "💡", q: "Световые линии / LED", a: "Lumfer" },
];

const MFR_TIPS: Record<Manufacturer, string> = {
  classic: "Базовая ПВХ-плёнка. Хороший старт для стандартных помещений.",
  bauf: "Доступная ПВХ с широкой палитрой цветов. Квартиры и офисы.",
  premium: "Плотнее Classic, насыщеннее цвет, меньше запах. Для жилых комнат.",
  evolution: "Устойчива к УФ, не желтеет. Долгий срок службы без потери вида.",
  teqtum_km2:
    "Армированная плёнка. Высокая прочность — ванные, кухни, объекты.",
  teqtum_euro:
    "Европейский класс, экосертификат. Минимальный запах — детские комнаты.",
  coldstretch:
    "Тканевое полотно без нагрева. Морозостойкое — дома и дачи в РТ.",
  lumfer:
    "Светорассеивающее полотно. Идеально для LED-потолков и световых линий.",
};

const MFR_MULT: Record<Manufacturer, number> = {
  classic: 1.0,
  premium: 1.2,
  evolution: 1.3,
  coldstretch: 1.15,
  teqtum_km2: 1.1,
  bauf: 1.05,
  teqtum_euro: 1.25,
  lumfer: 1.35,
};

const HEIGHT_LABELS: Record<Height, string> = {
  low: "До 3.2 метров",
  mid: "от 3.2 до 5 метров",
  high: "Более 5 метров",
};
const HEIGHT_SURCHARGE: Record<Height, number> = {
  low: 0,
  mid: 0.15,
  high: 0.3,
};

// Дополнительные работы
interface ExtraWork {
  id: string;
  label: string;
  price: number;
  unit: string;
  hasCount?: boolean;
}
const EXTRA_WORKS: ExtraWork[] = [
  {
    id: "chandelier",
    label: "Установка люстры / закладной",
    price: 350,
    unit: "шт",
    hasCount: true,
  },
  {
    id: "spotlights",
    label: "Установка светильников",
    price: 150,
    unit: "шт",
    hasCount: true,
  },
  {
    id: "cornice",
    label: "Установка карниза для штор",
    price: 500,
    unit: "шт",
  },
  {
    id: "corners",
    label: "Углов в помещении больше 4-х",
    price: 300,
    unit: "шт",
  },
  {
    id: "pipes",
    label: "Трубы, входящие в потолок",
    price: 450,
    unit: "шт",
    hasCount: true,
  },
  {
    id: "sensors",
    label: "Монтаж противопожарных датчиков",
    price: 200,
    unit: "шт",
    hasCount: true,
  },
  {
    id: "ventilation",
    label: "Установка отверстий под вентиляцию",
    price: 250,
    unit: "шт",
    hasCount: true,
  },
];

// Технологии
interface Tech {
  id: string;
  label: string;
  pricePerSqm?: number;
  priceFlat?: number;
}
const TECHNOLOGIES: Tech[] = [
  { id: "photo", label: "Фотопечать на потолке", pricePerSqm: 500 },
  {
    id: "multilevel",
    label: "Двухуровневые / многоуровневые",
    pricePerSqm: 300,
  },
  { id: "lightlines", label: "Монтаж световых линий", pricePerSqm: 250 },
  { id: "backlit", label: "Монтаж подсветки", pricePerSqm: 180 },
  { id: "weld", label: "Спайка", pricePerSqm: 120 },
  { id: "wardrobe", label: "Монтаж закладной под шкаф", priceFlat: 800 },
  { id: "tile", label: "Сверление (монтаж) по плитке", priceFlat: 300 },
];

const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));

const formatPhone = (raw: string) => {
  const d = raw.replace(/\D/g, "").slice(0, 11);
  if (!d.length) return "";
  let r = "+7";
  if (d.length > 1) r += " (" + d.slice(1, 4);
  if (d.length >= 4) r += ") " + d.slice(4, 7);
  if (d.length >= 7) r += "-" + d.slice(7, 9);
  if (d.length >= 9) r += "-" + d.slice(9, 11);
  return r;
};
const isValidPhone = (p: string) => p.replace(/\D/g, "").length === 11;

const handlePhoneKeyDownFactory =
  (phone: string, setPhone: (v: string) => void) =>
  (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      const digits = phone.replace(/\D/g, "");
      if (!digits.length) return;
      e.preventDefault();
      const shorter = digits.slice(0, -1);
      setPhone(shorter.length ? formatPhone(shorter) : "");
    }
  };

// ── Компонент ───────────────────────────────────────────────────────────────

const PriceCalculator = () => {
  // Параметры
  const [texture, setTexture] = useState<Texture>("glossy");
  const [lengthStr, setLengthStr] = useState("3");
  const [widthStr, setWidthStr] = useState("4");
  const [manufacturer, setManufacturer] = useState<Manufacturer>("classic");
  const [color, setColor] = useState<Color>("white");
  const [profile, setProfile] = useState<Profile>("plastic");
  const [height, setHeight] = useState<Height>("low");
  const [hasInsert, setHasInsert] = useState(false);
  const [mfrGuideOpen, setMfrGuideOpen] = useState(false);

  // Доп. работы: Map id -> checked + count
  const [extraChecked, setExtraChecked] = useState<Record<string, boolean>>({});
  const [extraCounts, setExtraCounts] = useState<Record<string, number>>({});

  // Технологии
  const [techChecked, setTechChecked] = useState<Record<string, boolean>>({});

  // Отправка
  const [phone, setPhone] = useState("");
  const [touched, setTouched] = useState(false);
  const [status, setStatus] = useState<Status>("idle");

  const L = parseFloat(lengthStr) || 0;
  const W = parseFloat(widthStr) || 0;
  const area = L * W;
  const perimeter = 2 * (L + W);

  // Расчёт цены
  const price = useMemo(() => {
    if (area <= 0) return 0;

    const base = area * TEXTURE_BASE[texture] * MFR_MULT[manufacturer];
    const colorExtra = color === "colored" ? area * 50 : 0;
    const profileExtra =
      profile === "aluminum" ? perimeter * 80 : perimeter * 30;
    const heightSurcharge = base * HEIGHT_SURCHARGE[height];
    const insertExtra = hasInsert ? perimeter * 60 : 0;

    let extras = 0;
    for (const work of EXTRA_WORKS) {
      if (!extraChecked[work.id]) continue;
      const count = work.hasCount ? (extraCounts[work.id] ?? 1) : 1;
      extras += work.price * count;
    }

    let techExtra = 0;
    for (const tech of TECHNOLOGIES) {
      if (!techChecked[tech.id]) continue;
      if (tech.pricePerSqm) techExtra += tech.pricePerSqm * area;
      if (tech.priceFlat) techExtra += tech.priceFlat;
    }

    return Math.round(
      base +
        colorExtra +
        profileExtra +
        heightSurcharge +
        insertExtra +
        extras +
        techExtra,
    );
  }, [
    area,
    perimeter,
    texture,
    manufacturer,
    color,
    profile,
    height,
    hasInsert,
    extraChecked,
    extraCounts,
    techChecked,
  ]);

  const toggleExtra = (id: string) => {
    setExtraChecked((prev) => ({ ...prev, [id]: !prev[id] }));
    if (!extraCounts[id]) setExtraCounts((prev) => ({ ...prev, [id]: 1 }));
  };

  const changeCount = (id: string, delta: number) => {
    setExtraCounts((prev) => ({
      ...prev,
      [id]: clamp((prev[id] ?? 1) + delta, 1, 99),
    }));
  };

  const toggleTech = (id: string) =>
    setTechChecked((prev) => ({ ...prev, [id]: !prev[id] }));

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!isValidPhone(phone)) return;
    setStatus("loading");

    const selectedExtras = EXTRA_WORKS.filter((w) => extraChecked[w.id])
      .map((w) => `${w.label}: ${extraCounts[w.id] ?? 1} шт.`)
      .join(", ");
    const selectedTech = TECHNOLOGIES.filter((t) => techChecked[t.id])
      .map((t) => t.label)
      .join(", ");

    const comment =
      `Расчёт по калькулятору:\n` +
      `Фактура: ${TEXTURE_LABELS[texture]}\n` +
      `Производитель: ${MFR_LABELS[manufacturer]}\n` +
      `Площадь: ${area.toFixed(1)} м² (${L}×${W} м)\n` +
      `Цвет: ${color === "white" ? "Белый" : "Цветной"}, Профиль: ${profile === "plastic" ? "Пластиковый" : "Алюминиевый"}\n` +
      `Высота: ${HEIGHT_LABELS[height]}\n` +
      (selectedExtras ? `Доп. работы: ${selectedExtras}\n` : "") +
      (selectedTech ? `Технологии: ${selectedTech}\n` : "") +
      `Примерная цена: ${price.toLocaleString("ru-RU")} ₽`;

    const fakeItem = {
      product: {
        id: "calc",
        name: TEXTURE_LABELS[texture],
        pricePerSqm: TEXTURE_BASE[texture],
        description: "",
        image: "",
        category: "matte" as const,
        parameters: [],
      },
      sqm: area,
    };

    const ok = await sendOrderToTelegram(phone, [fakeItem], comment);
    setStatus(ok ? "success" : "error");
  };

  if (status === "success") {
    return (
      <section className={styles.section} id="calculator">
        <div className={styles.container}>
          <div className={styles.success}>
            <div className={styles.successIcon}>✓</div>
            <h3>Заявка отправлена!</h3>
            <p>
              Мы перезвоним на <strong>{phone}</strong> и уточним детали.
            </p>
            <button
              className={styles.resetBtn}
              onClick={() => {
                setStatus("idle");
                setPhone("");
                setTouched(false);
              }}
            >
              Новый расчёт
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={styles.section} id="calculator">
      <div className={styles.container}>
        <h2 className={styles.title}>Калькулятор потолков</h2>
        <p className={styles.subtitle}>
          <strong>Цена указана внизу страницы, под калькулятором.</strong>{" "}
          Рассчитайте стоимость вашего нового натяжного потолка онлайн.
        </p>

        <div className={styles.grid}>
          {/* ── ЛЕВАЯ КОЛОНКА ─────────────────────────────── */}
          <div className={styles.col}>
            {/* Фактура */}
            <div className={styles.block}>
              <p className={styles.blockTitle}>Выберите фактуру:</p>
              <div className={styles.pills}>
                {(Object.keys(TEXTURE_LABELS) as Texture[]).map((t) => (
                  <button
                    key={t}
                    type="button"
                    className={`${styles.pill} ${texture === t ? styles.pillActive : ""}`}
                    onClick={() => setTexture(t)}
                  >
                    {TEXTURE_LABELS[t]}
                  </button>
                ))}
              </div>
            </div>

            {/* Размеры */}
            <div className={styles.block}>
              <p className={styles.blockTitle}>Укажите размеры помещения:</p>
              <div className={styles.dimRow}>
                <label className={styles.dimLabel}>
                  Длина
                  <input
                    type="number"
                    className={styles.dimInput}
                    min="1"
                    max="50"
                    step="0.1"
                    value={lengthStr}
                    onChange={(e) => setLengthStr(e.target.value)}
                  />
                  метр.
                </label>
                <label className={styles.dimLabel}>
                  Ширина
                  <input
                    type="number"
                    className={styles.dimInput}
                    min="1"
                    max="50"
                    step="0.1"
                    value={widthStr}
                    onChange={(e) => setWidthStr(e.target.value)}
                  />
                  метр.
                </label>
              </div>
              <p className={styles.dimHint}>
                Укажите длину и ширину — программа рассчитает площадь вашего
                помещения.
              </p>
            </div>

            {/* Производитель */}
            <div className={styles.block}>
              <div className={styles.blockTitleRow}>
                <p className={styles.blockTitle}>Выберите производителя:</p>
                <button
                  type="button"
                  className={styles.guideToggle}
                  onClick={() => setMfrGuideOpen((v) => !v)}
                >
                  {mfrGuideOpen ? "Скрыть" : "Как выбрать?"}
                  <svg
                    className={mfrGuideOpen ? styles.guideArrowOpen : ""}
                    width="13"
                    height="13"
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

              {mfrGuideOpen && (
                <div className={styles.guideGrid}>
                  {MFR_GUIDE.map((g) => (
                    <div key={g.q} className={styles.guideRow}>
                      <span className={styles.guideIcon}>{g.icon}</span>
                      <span className={styles.guideQ}>{g.q}</span>
                      <span className={styles.guideA}>{g.a}</span>
                    </div>
                  ))}
                </div>
              )}
              <div className={styles.pills}>
                {(Object.keys(MFR_LABELS) as Manufacturer[]).map((m) => (
                  <button
                    key={m}
                    type="button"
                    className={`${styles.pill} ${manufacturer === m ? styles.pillActive : ""}`}
                    onClick={() => setManufacturer(m)}
                  >
                    {MFR_LABELS[m]}
                  </button>
                ))}
              </div>
              <p className={styles.mfrTip}>
                <span className={styles.mfrTipName}>
                  {MFR_LABELS[manufacturer]}:
                </span>{" "}
                {MFR_TIPS[manufacturer]}
              </p>
            </div>

            {/* Высота комнаты */}
            <div className={styles.block}>
              <p className={styles.blockTitle}>Укажите высоту комнаты:</p>
              <p className={styles.dimHint}>
                Имеется в виду текущая высота комнаты от пола до плиты.
              </p>
              <div className={styles.pills}>
                {(Object.keys(HEIGHT_LABELS) as Height[]).map((h) => (
                  <button
                    key={h}
                    type="button"
                    className={`${styles.pill} ${height === h ? styles.pillActive : ""}`}
                    onClick={() => setHeight(h)}
                  >
                    {HEIGHT_LABELS[h]}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ── ПРАВАЯ КОЛОНКА ────────────────────────────── */}
          <div className={styles.col}>
            {/* Цвет полотна */}
            <div className={styles.block}>
              <p className={styles.blockTitle}>Выберите цвет полотна:</p>
              <div className={styles.pills}>
                {(["white", "colored"] as Color[]).map((c) => (
                  <button
                    key={c}
                    type="button"
                    className={`${styles.pill} ${color === c ? styles.pillActive : ""}`}
                    onClick={() => setColor(c)}
                  >
                    {c === "white" ? "Белый" : "Цветной"}
                  </button>
                ))}
              </div>
            </div>

            {/* Профиль */}
            <div className={styles.block}>
              <p className={styles.blockTitle}>Выберите профиль:</p>
              <p className={styles.dimHint}>
                Конструкция крепится к стене на специальный профиль. Бывает
                пластиковый и алюминиевый (дороже).
              </p>
              <div className={styles.pills}>
                {(["plastic", "aluminum"] as Profile[]).map((p) => (
                  <button
                    key={p}
                    type="button"
                    className={`${styles.pill} ${profile === p ? styles.pillActive : ""}`}
                    onClick={() => setProfile(p)}
                  >
                    {p === "plastic" ? "Пластиковый" : "Алюминиевый"}
                  </button>
                ))}
              </div>
            </div>

            {/* Вставка по периметру */}
            <div className={styles.block}>
              <p className={styles.blockTitle}>Вставка по периметру:</p>
              <p className={styles.dimHint}>
                Специальная декоративная лента по периметру, чтобы не было
                зазора между стеной и потолком.
              </p>
              <div className={styles.pills}>
                {[true, false].map((v) => (
                  <button
                    key={String(v)}
                    type="button"
                    className={`${styles.pill} ${hasInsert === v ? styles.pillActive : ""}`}
                    onClick={() => setHasInsert(v)}
                  >
                    {v ? "Да" : "Нет"}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Доп. работы и Технологии ─────────────────────── */}
        <div className={styles.extrasGrid}>
          <div className={styles.extrasCol}>
            <p className={styles.blockTitle}>Дополнительные работы:</p>
            <div className={styles.checkList}>
              {EXTRA_WORKS.map((work) => (
                <div key={work.id} className={styles.checkItem}>
                  <label className={styles.checkLabel}>
                    <input
                      type="checkbox"
                      className={styles.checkbox}
                      checked={!!extraChecked[work.id]}
                      onChange={() => toggleExtra(work.id)}
                    />
                    <span className={styles.checkMark} />
                    <span className={styles.checkText}>{work.label}</span>
                  </label>
                  {extraChecked[work.id] && work.hasCount && (
                    <div className={styles.countRow}>
                      <span className={styles.countLabel}>Количество:</span>
                      <button
                        type="button"
                        className={styles.countBtn}
                        onClick={() => changeCount(work.id, -1)}
                      >
                        −
                      </button>
                      <span className={styles.countVal}>
                        {extraCounts[work.id] ?? 1}
                      </span>
                      <button
                        type="button"
                        className={styles.countBtn}
                        onClick={() => changeCount(work.id, 1)}
                      >
                        +
                      </button>
                      <span className={styles.countUnit}>шт.</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className={styles.extrasCol}>
            <p className={styles.blockTitle}>Технологии:</p>
            <div className={styles.checkList}>
              {TECHNOLOGIES.map((tech) => (
                <label key={tech.id} className={styles.checkLabel}>
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    checked={!!techChecked[tech.id]}
                    onChange={() => toggleTech(tech.id)}
                  />
                  <span className={styles.checkMark} />
                  <span className={styles.checkText}>{tech.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* ── Итоговая цена ─────────────────────────────────── */}
        <div className={styles.priceBar}>
          <div className={styles.priceResult}>
            Примерная цена с установкой:{" "}
            <span className={styles.priceNum}>
              {area > 0
                ? `${price.toLocaleString("ru-RU")} рублей`
                : "— введите размеры"}
            </span>
          </div>
          {area > 0 && (
            <form className={styles.sendForm} onSubmit={handleSend} noValidate>
              <input
                type="tel"
                className={`${styles.phoneInput} ${touched && !isValidPhone(phone) ? styles.phoneInputError : ""}`}
                placeholder="Введите телефон"
                value={phone}
                onChange={(e) => setPhone(formatPhone(e.target.value))}
                onKeyDown={handlePhoneKeyDownFactory(phone, setPhone)}
                onBlur={() => setTouched(true)}
                autoComplete="tel"
              />
              <button
                type="submit"
                className={styles.sendBtn}
                disabled={status === "loading"}
              >
                {status === "loading" ? (
                  <span className={styles.spinner} />
                ) : (
                  "Получить консультацию"
                )}
              </button>
            </form>
          )}
          {touched && !isValidPhone(phone) && phone.length > 0 && (
            <p className={styles.phoneError}>Введите корректный номер</p>
          )}
          {status === "error" && (
            <p className={styles.phoneError}>
              Не удалось отправить. Попробуйте ещё раз.
            </p>
          )}
          <p className={styles.priceNote}>
            Нажимая кнопку «Получить консультацию», Вы соглашаетесь на обработку
            персональных данных №152-ФЗ от 27.07.2006 г.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PriceCalculator;
