import styles from "./Contacts.module.scss";

const Contacts = () => {
  return (
    <section className={styles.section} id="contacts">
      <div className={styles.container}>
        <div className={styles.head}>
          <p className={styles.eyebrow}>Свяжитесь с нами</p>
          <h2 className={styles.title}>Контакты</h2>
          <p className={styles.subtitle}>
            Позвоните нам или оставьте заявку — перезвоним в течение 15 минут
          </p>
        </div>

        <div className={styles.grid}>
          <div className={styles.card}>
            <div className={styles.iconWrap}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.41 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.82a16 16 0 0 0 6.29 6.29l.95-.95a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </div>
            <p className={styles.cardLabel}>Телефон</p>
            <a className={styles.cardValue} href="tel:+78001234567">
              +7 (967) 780-84-52
            </a>
            <p className={styles.cardNote}>Телефон доступен с 8:00 по 21:00</p>
          </div>

          <div className={styles.card}>
            <div className={styles.iconWrap}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke="none"
              >
                <path d="M21.547 7h-3.29a.743.743 0 0 0-.655.392s-1.312 2.416-1.734 3.23C14.734 12.813 14 12.126 14 11.11V7.603A1.104 1.104 0 0 0 12.896 6.5h-2.474a1.982 1.982 0 0 0-1.75.813s1.255-.204 1.255 1.49c0 .42.022 1.626.04 2.64a.73.73 0 0 1-1.272.503 21.54 21.54 0 0 1-2.498-4.543.693.693 0 0 0-.63-.403h-2.99a.508.508 0 0 0-.48.685C3.005 10.175 6.918 18 11.38 18h1.878a.742.742 0 0 0 .742-.742v-1.135a.73.73 0 0 1 1.23-.53l2.247 2.112a1.09 1.09 0 0 0 .746.295h2.953c1.424 0 1.424-.988.647-1.753-.546-.538-2.518-2.617-2.518-2.617a1.02 1.02 0 0 1-.078-1.323c.637-.84 1.68-2.212 2.122-2.8.603-.804 1.697-2.507.197-2.507z" />
              </svg>
            </div>
            <p className={styles.cardLabel}>ВКонтакте</p>
            <a
              className={styles.cardValue}
              href="https://vk.com/il_ya95"
              target="_blank"
              rel="noopener noreferrer"
            >
              vk.com/il_ya95
            </a>
            <p className={styles.cardNote}>Напишите нам в VK</p>
          </div>

          <div className={styles.card}>
            <div className={styles.iconWrap}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </div>
            <p className={styles.cardLabel}>Telegram</p>
            <a
              className={styles.cardValue}
              href="https://t.me/Il_ya95"
              target="_blank"
              rel="noopener noreferrer"
            >
              @Il_ya95
            </a>
            <p className={styles.cardNote}>Ответим быстро в Telegram</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contacts;
