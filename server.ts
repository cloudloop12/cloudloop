import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import { createServer as createViteServer } from 'vite';

dotenv.config();

export const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Email Activity Log Entry Interface
export interface EmailLogEntry {
  id: string;
  timestamp: string;
  type: string;
  recipient: string;
  subject: string;
  status: 'success' | 'failed';
  error?: string;
  details?: Record<string, any>;
}

// In-Memory Email Activity Logs Store
const emailLogs: EmailLogEntry[] = [];

function addEmailLog(entry: Omit<EmailLogEntry, 'id' | 'timestamp'>) {
  const log: EmailLogEntry = {
    ...entry,
    id: `log_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    timestamp: new Date().toISOString(),
  };
  emailLogs.unshift(log);
  if (emailLogs.length > 100) {
    emailLogs.pop();
  }
  return log;
}

// Transporter Helper Function
export function getTransporter() {
  const user = process.env.GMAIL_USER || 'mailtocloudloop@gmail.com';
  const rawPass = process.env.GMAIL_APP_PASSWORD;

  if (!user || !rawPass) {
    return null;
  }

  // Strip all whitespace spaces from Google App Passwords (e.g. "bkhn bkiu tgje lnmj" -> "bkhnbkiutgjelnmj")
  const pass = rawPass.replace(/\s+/g, '').trim();

  return nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: user,
      pass: pass,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
}

// -------------------------------------------------------------
// HTML Email Template Generators
// -------------------------------------------------------------

function generateAdminEmailHTML(type: string, data: Record<string, any>) {
  const formattedFields = Object.entries(data)
    .map(
      ([key, val]) => `
      <tr>
        <td style="padding: 10px 14px; background: #0f172a; color: #94a3b8; font-weight: 600; font-size: 13px; text-transform: uppercase; border-bottom: 1px solid #1e293b; width: 35%;">${key.replace(/_/g, ' ')}</td>
        <td style="padding: 10px 14px; background: #0b1120; color: #f8fafc; font-size: 14px; border-bottom: 1px solid #1e293b;">${val || 'N/A'}</td>
      </tr>
    `
    )
    .join('');

  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <title>New Inquiry Alert - ${type}</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #020617; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #f8fafc;">
    <table width="100%" cellpadding="0" cellspacing="0" style="padding: 40px 20px;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background-color: #0b1120; border: 1px solid #1e293b; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.5);">
            <!-- Header -->
            <tr>
              <td style="background: linear-gradient(135deg, #090d16 0%, #0f172a 100%); padding: 30px; text-align: center; border-bottom: 2px solid #0284c7;">
                <h1 style="margin: 0; color: #38bdf8; font-size: 24px; font-weight: 800; letter-spacing: 1px;">CLOUDLOOP GROUP</h1>
                <p style="margin: 6px 0 0 0; color: #94a3b8; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 2px;">Admin Event Notification System</p>
              </td>
            </tr>
            <!-- Content -->
            <tr>
              <td style="padding: 32px;">
                <div style="margin-bottom: 24px;">
                  <span style="display: inline-block; padding: 6px 14px; background: rgba(2, 132, 199, 0.2); border: 1px solid #0284c7; color: #38bdf8; font-size: 12px; font-weight: 700; border-radius: 20px; text-transform: uppercase;">
                    ⚡ ${type}
                  </span>
                </div>
                <h2 style="margin: 0 0 16px 0; color: #ffffff; font-size: 18px;">Submission Details</h2>
                <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; border-radius: 8px; overflow: hidden; margin-bottom: 24px;">
                  ${formattedFields}
                </table>
                <p style="margin: 0; font-size: 12px; color: #64748b; text-align: right;">Received on: ${new Date().toLocaleString('en-US', { timeZone: 'Asia/Dubai' })} GST (Dubai)</p>
              </td>
            </tr>
            <!-- Footer -->
            <tr>
              <td style="padding: 20px; background-color: #090d16; border-top: 1px solid #1e293b; text-align: center; font-size: 12px; color: #64748b;">
                Cloudloop Group LLC • Level 18, Business Bay Tower, Sheikh Zayed Road, Dubai, UAE
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
}

function generateCustomerConfirmationHTML(name: string, type: string) {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <title>Thank You for Contacting Cloudloop Group UAE</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #0f172a;">
    <table width="100%" cellpadding="0" cellspacing="0" style="padding: 40px 20px;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.06);">
            <!-- Header -->
            <tr>
              <td style="background-color: #020617; padding: 36px 30px; text-align: center;">
                <h1 style="margin: 0; color: #ffffff; font-size: 26px; font-weight: 800; letter-spacing: 1px;">CLOUDLOOP <span style="color: #38bdf8;">GROUP</span></h1>
                <p style="margin: 8px 0 0 0; color: #94a3b8; font-size: 13px; font-weight: 500;">Documents Clearing & Information Technology Division</p>
              </td>
            </tr>
            <!-- Content -->
            <tr>
              <td style="padding: 40px 32px;">
                <h2 style="margin: 0 0 16px 0; color: #020617; font-size: 20px;">Dear ${name || 'Valued Client'},</h2>
                <p style="margin: 0 0 20px 0; font-size: 15px; line-height: 1.6; color: #334155;">
                  Thank you for submitting your <strong>${type}</strong> request with Cloudloop Group UAE. We have successfully logged your inquiry and assigned an executive senior consultant to your case.
                </p>

                <div style="background-color: #f0f9ff; border-left: 4px solid #0284c7; padding: 20px; border-radius: 8px; margin-bottom: 28px;">
                  <h3 style="margin: 0 0 8px 0; color: #0369a1; font-size: 15px; font-weight: 700;">What Happens Next?</h3>
                  <ul style="margin: 0; padding-left: 20px; color: #0c4a6e; font-size: 14px; line-height: 1.6;">
                    <li>Our specialized team will review your requirements within <strong>2 business hours</strong>.</li>
                    <li>A dedicated account manager will contact you via email or phone (+971).</li>
                    <li>For urgent processing, feel free to contact our direct WhatsApp desk below.</li>
                  </ul>
                </div>

                <div style="text-align: center; margin-bottom: 30px;">
                  <a href="https://wa.me/971556126050?text=Hello%20Cloudloop%20Group,%20I%20have%20submitted%20a%20request" style="display: inline-block; padding: 14px 28px; background-color: #25d366; color: #ffffff; font-weight: 700; font-size: 14px; text-decoration: none; border-radius: 10px; box-shadow: 0 4px 12px rgba(37,211,102,0.3);">
                    💬 Connect Instantly via WhatsApp (+971 55 612 6050)
                  </a>
                </div>

                <p style="margin: 0; font-size: 14px; line-height: 1.5; color: #64748b;">
                  Best regards,<br>
                  <strong style="color: #0f172a;">Executive Relations Team</strong><br>
                  Cloudloop Group LLC | Dubai, UAE
                </p>
              </td>
            </tr>
            <!-- Footer -->
            <tr>
              <td style="padding: 24px; background-color: #f8fafc; border-top: 1px solid #e2e8f0; text-align: center; font-size: 12px; color: #64748b; line-height: 1.6;">
                Cloudloop Group LLC • Business Bay Tower, Sheikh Zayed Road, Dubai, UAE<br>
                Phone: +971-55-612-6050 | Email: info@cloudloopgroup.com | Website: cloudloopgroup.com
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
}

// -------------------------------------------------------------
// API Endpoints
// -------------------------------------------------------------

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// SMTP Diagnostic Endpoint
app.get('/api/email/status', async (req, res) => {
  const rawUser = process.env.GMAIL_USER;
  const rawPass = process.env.GMAIL_APP_PASSWORD;
  const rawNotification = process.env.NOTIFICATION_EMAIL;

  const user = rawUser || 'mailtocloudloop@gmail.com';
  const notificationEmail = rawNotification || user;

  const envLoaded = {
    GMAIL_USER: !!rawUser,
    GMAIL_APP_PASSWORD: !!rawPass,
    NOTIFICATION_EMAIL: !!rawNotification,
  };

  const missingVars: string[] = [];
  if (!rawUser) missingVars.push('GMAIL_USER');
  if (!rawPass) missingVars.push('GMAIL_APP_PASSWORD');
  if (!rawNotification) missingVars.push('NOTIFICATION_EMAIL');

  const sanitizedPasswordLength = rawPass ? rawPass.replace(/\s+/g, '').length : 0;
  const hasSpacesInPassword = rawPass ? /\s/.test(rawPass) : false;

  const transporter = getTransporter();

  if (!transporter) {
    return res.json({
      connected: false,
      authStatus: missingVars.length > 0 
        ? `Missing Environment Variable(s): ${missingVars.join(', ')}` 
        : 'GMAIL_APP_PASSWORD is missing',
      gmailUser: user,
      notificationEmail: notificationEmail,
      envLoaded,
      missingVars,
      sanitizedPasswordLength,
      hasSpacesInPassword,
      platform: process.env.VERCEL ? 'Vercel Serverless' : 'Express / Container',
      lastError: missingVars.length > 0 ? `Please verify Vercel environment variables: ${missingVars.join(', ')}` : 'GMAIL_APP_PASSWORD is not set',
      totalLogs: emailLogs.length,
    });
  }

  try {
    await transporter.verify();
    return res.json({
      connected: true,
      authStatus: 'SMTP Connection & Gmail Authentication Verified Successfully',
      gmailUser: user,
      notificationEmail: notificationEmail,
      envLoaded,
      missingVars,
      sanitizedPasswordLength,
      hasSpacesInPassword,
      platform: process.env.VERCEL ? 'Vercel Serverless' : 'Express / Container',
      lastError: null,
      totalLogs: emailLogs.length,
    });
  } catch (error: any) {
    let detailedMsg = error.message || String(error);
    if (detailedMsg.includes('535') || detailedMsg.includes('Username and Password not accepted')) {
      detailedMsg = `Gmail Rejected Password (535 Bad Credentials). Please ensure 2FA is active & 16-character App Password is used. Password length: ${sanitizedPasswordLength}.`;
    }
    return res.json({
      connected: false,
      authStatus: `SMTP Connection / Auth Failed: ${detailedMsg}`,
      gmailUser: user,
      notificationEmail: notificationEmail,
      envLoaded,
      missingVars,
      sanitizedPasswordLength,
      hasSpacesInPassword,
      platform: process.env.VERCEL ? 'Vercel Serverless' : 'Express / Container',
      lastError: detailedMsg,
      totalLogs: emailLogs.length,
    });
  }
});

// Email Logs Endpoint
app.get('/api/email/logs', (req, res) => {
  return res.json({ logs: emailLogs });
});

// Test Email Sending Endpoint
app.post('/api/email/test-send', async (req, res) => {
  const targetEmail = req.body.recipient || process.env.NOTIFICATION_EMAIL || process.env.GMAIL_USER || 'mailtocloudloop@gmail.com';
  const transporter = getTransporter();

  if (!transporter) {
    const errorMsg = 'Cannot send test email: GMAIL_APP_PASSWORD environment variable is missing.';
    addEmailLog({
      type: 'SMTP Diagnostic Test',
      recipient: targetEmail,
      subject: 'Test Email Diagnostic Attempt',
      status: 'failed',
      error: errorMsg,
    });
    return res.status(400).json({
      success: false,
      error: errorMsg,
    });
  }

  try {
    const info = await transporter.sendMail({
      from: `"Cloudloop Group Diagnostic" <${process.env.GMAIL_USER || 'mailtocloudloop@gmail.com'}>`,
      to: targetEmail,
      subject: `[SMTP Test] Cloudloop Email System Diagnostic - ${new Date().toLocaleTimeString()}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; background-color: #0f172a; color: #f8fafc; border-radius: 12px;">
          <h2 style="color: #38bdf8;">✅ Cloudloop SMTP Integration Verified</h2>
          <p>This test email confirms that Gmail SMTP authentication is functioning correctly on your server.</p>
          <ul>
            <li><strong>Timestamp:</strong> ${new Date().toISOString()}</li>
            <li><strong>Sender:</strong> ${process.env.GMAIL_USER || 'mailtocloudloop@gmail.com'}</li>
            <li><strong>Recipient:</strong> ${targetEmail}</li>
          </ul>
        </div>
      `,
    });

    addEmailLog({
      type: 'SMTP Diagnostic Test',
      recipient: targetEmail,
      subject: 'Test Email Diagnostic Attempt',
      status: 'success',
      details: { messageId: info.messageId, response: info.response },
    });

    return res.json({
      success: true,
      message: `Test email dispatched successfully to ${targetEmail}`,
      messageId: info.messageId,
    });
  } catch (error: any) {
    const errorMsg = error.message || String(error);
    addEmailLog({
      type: 'SMTP Diagnostic Test',
      recipient: targetEmail,
      subject: 'Test Email Diagnostic Attempt',
      status: 'failed',
      error: errorMsg,
    });

    return res.status(500).json({
      success: false,
      error: errorMsg,
    });
  }
});

// Generic Submission Handler for Contact, Consultation, Quote, Newsletter, Career
async function handleSubmission(req: express.Request, res: express.Response, type: string) {
  const data = req.body;
  console.log(`[API] Processing ${type} submission:`, data);

  const transporter = getTransporter();
  const adminTarget = process.env.NOTIFICATION_EMAIL || process.env.GMAIL_USER || 'mailtocloudloop@gmail.com';
  const clientEmail = data.email;

  let adminMailSuccess = false;
  let clientMailSuccess = false;
  let lastErrorMessage = '';

  if (transporter) {
    // 1. Send Admin Email
    try {
      const adminSubject = `[Cloudloop Lead] New ${type} Submission from ${data.name || data.fullName || data.email}`;
      await transporter.sendMail({
        from: `"Cloudloop Web Desk" <${process.env.GMAIL_USER || 'mailtocloudloop@gmail.com'}>`,
        to: adminTarget,
        subject: adminSubject,
        html: generateAdminEmailHTML(type, data),
      });
      adminMailSuccess = true;

      addEmailLog({
        type: `Admin Notification (${type})`,
        recipient: adminTarget,
        subject: adminSubject,
        status: 'success',
        details: data,
      });
    } catch (err: any) {
      lastErrorMessage = `Admin Email Error: ${err.message || String(err)}`;
      console.error(`[API SMTP Error] ${lastErrorMessage}`);

      addEmailLog({
        type: `Admin Notification (${type})`,
        recipient: adminTarget,
        subject: `New ${type} Submission`,
        status: 'failed',
        error: lastErrorMessage,
        details: data,
      });
    }

    // 2. Send Customer Confirmation Email if client email provided
    if (clientEmail) {
      try {
        const clientSubject = `Confirmation: We received your ${type} request - Cloudloop Group`;
        await transporter.sendMail({
          from: `"Cloudloop Group UAE" <${process.env.GMAIL_USER || 'mailtocloudloop@gmail.com'}>`,
          to: clientEmail,
          subject: clientSubject,
          html: generateCustomerConfirmationHTML(data.name || data.fullName || 'Valued Client', type),
        });
        clientMailSuccess = true;

        addEmailLog({
          type: `Customer Confirmation (${type})`,
          recipient: clientEmail,
          subject: clientSubject,
          status: 'success',
        });
      } catch (err: any) {
        const clientError = `Client Confirmation Email Error: ${err.message || String(err)}`;
        lastErrorMessage = lastErrorMessage ? `${lastErrorMessage} | ${clientError}` : clientError;
        console.error(`[API SMTP Error] ${clientError}`);

        addEmailLog({
          type: `Customer Confirmation (${type})`,
          recipient: clientEmail,
          subject: `Confirmation: ${type}`,
          status: 'failed',
          error: clientError,
        });
      }
    }
  } else {
    lastErrorMessage = 'GMAIL_APP_PASSWORD environment variable is missing on server.';
    console.warn(`[API SMTP Warning] ${lastErrorMessage}`);

    addEmailLog({
      type: `Form Submission (${type})`,
      recipient: adminTarget,
      subject: `Form Submission (${type})`,
      status: 'failed',
      error: lastErrorMessage,
      details: data,
    });
  }

  // Return appropriate response
  if (adminMailSuccess || clientMailSuccess) {
    return res.status(200).json({
      success: true,
      message: `${type} submitted and emails processed successfully!`,
      emailStatus: { adminMailSuccess, clientMailSuccess },
    });
  } else {
    // Return 200 with fallback message or 500 depending on requirement, but log error clearly
    return res.status(200).json({
      success: true, // keep form flow smooth for user
      message: `${type} received! Note: Email dispatch recorded status: ${lastErrorMessage || 'Logged'}`,
      emailStatus: { adminMailSuccess: false, clientMailSuccess: false, error: lastErrorMessage },
    });
  }
}

app.post('/api/contact', (req, res) => handleSubmission(req, res, 'Contact Form'));
app.post('/api/consultation', (req, res) => handleSubmission(req, res, 'Consultation Booking'));
app.post('/api/quote', (req, res) => handleSubmission(req, res, 'Quote Request'));
app.post('/api/newsletter', (req, res) => handleSubmission(req, res, 'Newsletter Subscription'));
app.post('/api/career-apply', (req, res) => handleSubmission(req, res, 'Career Application'));

// -------------------------------------------------------------
// Vite Middleware / Static Server Integration
// -------------------------------------------------------------

async function start() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Cloudloop Group server listening on port ${PORT}`);
  });
}

// Start standalone server only when executed directly
if (process.env.VERCEL !== '1') {
  start();
}
