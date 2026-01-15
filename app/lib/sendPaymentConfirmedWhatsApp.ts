type WhatsAppPayload = {
  phone: string;
  firstName: string;
  bookingId: string;
  checkIn: string;
  checkOut: string;
  total: number;
};

export function sendPaymentConfirmedWhatsApp(data: WhatsAppPayload): string {
  const message = `
Hello ${data.firstName} 👋

✅ Your payment has been confirmed!

📅 Dates: ${data.checkIn} → ${data.checkOut}
💳 Total: ${data.total.toLocaleString("fr-FR")} XAF
🆔 Booking ID: ${data.bookingId}

We look forward to welcoming you at Vita Resort 🌴

If you have any questions, feel free to reply to this message.
  `.trim();

  const encoded = encodeURIComponent(message);
  const phone = data.phone.replace(/\D/g, "");

  return `https://wa.me/${phone}?text=${encoded}`;
}
