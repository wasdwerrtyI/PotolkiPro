import type { CartItem } from "../types";

const BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN as string;
const CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID as string;

export const sendOrderToTelegram = async (
  phone: string,
  items: CartItem[],
  comment?: string,
): Promise<boolean> => {
  if (!BOT_TOKEN || !CHAT_ID) {
    console.warn("Telegram credentials not configured. Check .env file.");
    return false;
  }

  const total = items.reduce(
    (sum, item) => sum + item.product.pricePerSqm * item.sqm,
    0,
  );

  const itemsList = items
    .map(
      (item) =>
        `• ${item.product.name} — ${item.sqm} м² × ${item.product.pricePerSqm.toLocaleString("ru-RU")} ₽ = ${(item.sqm * item.product.pricePerSqm).toLocaleString("ru-RU")} ₽`,
    )
    .join("\n");

  const commentLine =
    comment && comment.trim() ? `\n\n💬 *Комментарий:* ${comment.trim()}` : "";

  const message =
    `🛒 *Новая заявка с сайта*\n\n` +
    `📞 Телефон клиента: \`${phone}\`\n\n` +
    `*Состав заказа:*\n${itemsList}\n\n` +
    `💰 *Итого: ${total.toLocaleString("ru-RU")} ₽*` +
    commentLine;

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message,
          parse_mode: "Markdown",
        }),
      },
    );
    return response.ok;
  } catch {
    return false;
  }
};
