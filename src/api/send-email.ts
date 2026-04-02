// api/send-email.ts
// import type { VercelRequest, VercelResponse } from '@vercel/node'; // optional types
import nodemailer from 'nodemailer';

type Body = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
};

function validate(body: Body) {
  if (!body.name || !body.email || !body.subject || !body.message) {
    return 'All fields are required.';
  }
  // simple email check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(body.email)) return 'Invalid email.';
  if (body.message!.length < 10) return 'Message too short.';
  return null;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method !== 'POST') {
      res.setHeader('Allow', 'POST');
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const body = req.body as Body;
    const validationError = validate(body);
    if (validationError) return res.status(400).json({ error: validationError });

    // --- CONFIG: read from env (set these in Vercel)
    const SMTP_HOST = process.env.EMAIL_SMTP_HOST || 'smtp.hostinger.com';
    const SMTP_PORT = Number(process.env.EMAIL_SMTP_PORT || 587);
    const SMTP_SECURE = (process.env.EMAIL_SMTP_SECURE || 'false') === 'true';
    const SMTP_USER = process.env.EMAIL_USER; // abhishek@codewithabhishek.in
    const SMTP_PASS = process.env.EMAIL_PASS;
    const TO = process.env.CONTACT_RECIPIENT || process.env.EMAIL_USER;
    const FROM = process.env.EMAIL_FROM || SMTP_USER;

    if (!SMTP_USER || !SMTP_PASS) {
      return res.status(500).json({ error: 'SMTP not configured. Please set EMAIL_USER and EMAIL_PASS.' });
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_SECURE, // true for 465, false for 587
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    // Build email HTML/plain
    const subject = `[Portfolio Contact] ${body.subject}`;
    const html = `
      <h3>New message from CodeWithAbhishek site</h3>
      <p><strong>Name:</strong> ${body.name}</p>
      <p><strong>Email:</strong> ${body.email}</p>
      <p><strong>Subject:</strong> ${body.subject}</p>
      <hr/>
      <p>${(body.message || '').replace(/\n/g, '<br/>')}</p>
    `;
    const text = `Name: ${body.name}\nEmail: ${body.email}\nSubject: ${body.subject}\n\n${body.message}`;

    // send mail
    const info = await transporter.sendMail({
      from: `"CodeWithAbhishek" <${FROM}>`,
      to: TO,
      replyTo: body.email,
      subject,
      text,
      html,
    });

    // success
    return res.status(200).json({ ok: true, messageId: (info as any)?.messageId || null });
  } catch (err: unknown) {
    // avoid `any` lint errors — handle unknown safely
    const message = err instanceof Error ? err.message : 'Unknown server error';
    console.error('send-email error:', err);
    return res.status(500).json({ error: message });
  }
}
