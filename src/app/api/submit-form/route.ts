import { NextRequest, NextResponse } from 'next/server';

const TELEGRAM_BOT_TOKEN = '8396499616:AAF-DjqgQ2IpzTwmc-ezmboobZ2hbz1UO3o';
const TELEGRAM_CHAT_ID = '6338779682'; // Ваш личный Telegram ID

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, phone, telegram, consent } = body;

    // Валидация данных
    if (!name || !phone) {
      return NextResponse.json(
        { error: 'Имя и телефон обязательны для заполнения' },
        { status: 400 }
      );
    }

    if (!consent) {
      return NextResponse.json(
        { error: 'Необходимо согласие на обработку персональных данных' },
        { status: 400 }
      );
    }

    // Формируем сообщение для Telegram
    const message = `🆕 Новая заявка на тестирование CRM системы!

👤 ФИО: ${name}
📞 Телефон: ${phone}
${telegram ? `📱 Telegram: ${telegram}` : ''}
✅ Согласие на обработку данных: Да

📅 Дата: ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })}`;

    // Отправляем сообщение в Telegram
    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: message,
          parse_mode: 'HTML',
        }),
      }
    );

    if (!telegramResponse.ok) {
      const errorData = await telegramResponse.json();
      console.error('Ошибка отправки в Telegram:', errorData);
      
      return NextResponse.json(
        { error: 'Ошибка отправки заявки. Попробуйте позже.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Заявка успешно отправлена!' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Ошибка обработки заявки:', error);
    return NextResponse.json(
      { error: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
}