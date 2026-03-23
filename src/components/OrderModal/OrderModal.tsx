import { useState } from "react";
import { observer } from "mobx-react-lite";
import { cartStore } from "../../stores/cartStore";
import { sendOrderToTelegram } from "../../services/telegram";
import styles from "./OrderModal.module.scss";

interface Props {
  onClose: () => void;
}

type Status = "idle" | "loading" | "success" | "error";

const formatPhone = (raw: string): string => {
  const digits = raw.replace(/\D/g, "").slice(0, 11);
  let result = "";
  if (digits.length === 0) return "";
  result = "+7";
  if (digits.length > 1) result += " (" + digits.slice(1, 4);
  if (digits.length >= 4) result += ") " + digits.slice(4, 7);
  if (digits.length >= 7) result += "-" + digits.slice(7, 9);
  if (digits.length >= 9) result += "-" + digits.slice(9, 11);
  return result;
};

const isValidPhone = (phone: string): boolean => {
  return phone.replace(/\D/g, "").length === 11;
};

const OrderModal = observer(({ onClose }: Props) => {
  const [phone, setPhone] = useState("");
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [touched, setTouched] = useState(false);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(formatPhone(e.target.value));
  };

  const handlePhoneKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      const digits = phone.replace(/\D/g, "");
      if (!digits.length) return;
      e.preventDefault();
      const shorter = digits.slice(0, -1);
      setPhone(shorter.length ? formatPhone(shorter) : "");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!isValidPhone(phone)) return;

    setStatus("loading");
    const ok = await sendOrderToTelegram(phone, cartStore.items, comment);

    if (ok) {
      setStatus("success");
      cartStore.clear();
      cartStore.closeCart();
    } else {
      setStatus("error");
    }
  };

  const phoneError = touched && !isValidPhone(phone);

  return (
    <div
      className={styles.backdrop}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className={styles.modal}>
        {status === "success" ? (
          <div className={styles.success}>
            <div className={styles.successIcon}>
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h3 className={styles.successTitle}>Заявка отправлена!</h3>
            <p className={styles.successText}>
              Наш специалист получил ваш заказ и свяжется с вами по номеру
              <br />
              <strong>{phone}</strong> в ближайшее время.
            </p>
            <button className={styles.successBtn} onClick={onClose}>
              Отлично, спасибо!
            </button>
          </div>
        ) : (
          <>
            <div className={styles.header}>
              <div>
                <h2 className={styles.title}>Оформление заявки</h2>
                <p className={styles.subtitle}>
                  Укажите номер телефона — мы перезвоним и уточним детали
                </p>
              </div>
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
            </div>

            <div className={styles.orderSummary}>
              <p className={styles.summaryLabel}>Ваш заказ:</p>
              <ul className={styles.summaryList}>
                {cartStore.items.map((item) => (
                  <li key={item.product.id} className={styles.summaryItem}>
                    <span className={styles.summaryName}>
                      {item.product.name}
                    </span>
                    {item.product.category === "service" ? (
                      <span className={styles.summaryPrice}>По заявке</span>
                    ) : (
                      <>
                        <span className={styles.summarySqm}>{item.sqm} м²</span>
                        <span className={styles.summaryPrice}>
                          {(item.product.pricePerSqm * item.sqm).toLocaleString(
                            "ru-RU",
                          )}{" "}
                          ₽
                        </span>
                      </>
                    )}
                  </li>
                ))}
              </ul>
              <div className={styles.summaryTotal}>
                <span>Итого</span>
                <span>{cartStore.total.toLocaleString("ru-RU")} ₽</span>
              </div>
            </div>

            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="phone">
                  Номер телефона
                </label>
                <input
                  id="phone"
                  type="tel"
                  className={`${styles.input} ${phoneError ? styles.inputError : ""}`}
                  placeholder="+7 (___) ___-__-__"
                  value={phone}
                  onChange={handlePhoneChange}
                  onKeyDown={handlePhoneKeyDown}
                  onBlur={() => setTouched(true)}
                  autoComplete="tel"
                  autoFocus
                />
                {phoneError && (
                  <span className={styles.errorMsg}>
                    Введите корректный номер телефона
                  </span>
                )}
              </div>

              <div className={styles.field}>
                <label className={styles.label} htmlFor="comment">
                  Комментарий{" "}
                  <span className={styles.optional}>(необязательно)</span>
                </label>
                <textarea
                  id="comment"
                  className={styles.textarea}
                  placeholder="Пожелания, удобное время звонка, особенности помещения..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={3}
                />
              </div>

              {status === "error" && (
                <div className={styles.errorBanner}>
                  Не удалось отправить заявку. Проверьте настройки Telegram-бота
                  или позвоните нам напрямую.
                </div>
              )}

              <button
                type="submit"
                className={styles.submitBtn}
                disabled={status === "loading"}
              >
                {status === "loading" ? (
                  <>
                    <span className={styles.spinner} />
                    Отправляем...
                  </>
                ) : (
                  <>
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
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                    Отправить заявку
                  </>
                )}
              </button>

              <p className={styles.privacy}>
                Нажимая кнопку, вы соглашаетесь на обработку персональных данных
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
});

export default OrderModal;
