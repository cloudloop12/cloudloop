import express from 'express';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

export const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// URL Normalization Middleware for Vercel Serverless Functions
app.use((req, res, next) => {
  // Guarantee JSON Content-Type header for all API calls
  if (req.url.startsWith('/api') || req.url.startsWith('/env-check') || req.url.startsWith('/email')) {
    res.setHeader('Content-Type', 'application/json');
  }

  // Normalize Vercel serverless function entry route prefixes if present
  if (req.url.startsWith('/api/index.ts')) {
    req.url = req.url.replace('/api/index.ts', '');
    if (!req.url.startsWith('/')) req.url = '/' + req.url;
  } else if (req.url.startsWith('/api/index')) {
    req.url = req.url.replace('/api/index', '');
    if (!req.url.startsWith('/')) req.url = '/' + req.url;
  }

  if (req.url === '' || req.url === '/api/') {
    req.url = '/api';
  }

  next();
});

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
import { generateInvoicePDF, InvoiceData, ServiceItem, formatAED } from './server/pdfGenerator.js';
import { generateAdminOrderEmailHTML, generateCustomerConfirmationEmailHTML } from './server/emailTemplates.js';

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
  const user = process.env.GMAIL_USER;
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

function getServicePriceEstimate(serviceName: string): number {
  const name = (serviceName || '').toLowerCase();
  if (name.includes('setup') || name.includes('free zone') || name.includes('mainland')) return 12500;
  if (name.includes('tax') || name.includes('vat') || name.includes('accounting')) return 3500;
  if (name.includes('pro') || name.includes('visa')) return 2200;
  if (name.includes('cloud') || name.includes('infrastructure')) return 8500;
  if (name.includes('software') || name.includes('app') || name.includes('web')) return 15000;
  if (name.includes('seo') || name.includes('marketing')) return 4500;
  if (name.includes('consultation') || name.includes('advisory')) return 1500;
  return 2500;
}

function buildInvoiceDataFromSubmission(data: any, type: string): InvoiceData {
  const invoiceNumber = `INV-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
  const dateStr = new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
  const dueDateObj = new Date();
  dueDateObj.setDate(dueDateObj.getDate() + 30);
  const dueDateStr = dueDateObj.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });

  let items: ServiceItem[] = [];

  if (Array.isArray(data.items) && data.items.length > 0) {
    items = data.items.map((i: any) => ({
      name: i.name || i.service || 'Cloudloop Professional Service',
      quantity: Number(i.quantity) || 1,
      unitPrice: Number(i.unitPrice) || Number(i.price) || 1500,
      total: (Number(i.quantity) || 1) * (Number(i.unitPrice) || Number(i.price) || 1500),
    }));
  } else if (Array.isArray(data.services) && data.services.length > 0) {
    items = data.services.map((srv: string) => {
      const price = getServicePriceEstimate(srv);
      return { name: srv, quantity: 1, unitPrice: price, total: price };
    });
  } else {
    const srvName = data.serviceNeeded || data.service || data.position || `${type} Consultation & Processing`;
    const qty = Number(data.quantity) || 1;
    const unitPrice = Number(data.unitPrice) || getServicePriceEstimate(srvName);
    items = [{ name: srvName, quantity: qty, unitPrice, total: qty * unitPrice }];
  }

  const subtotal = items.reduce((acc, curr) => acc + curr.total, 0);
  const vat = Math.round(subtotal * 0.05 * 100) / 100;
  const discount = Number(data.discount) || 0;
  const grandTotal = subtotal + vat - discount;

  return {
    invoiceNumber,
    date: dateStr,
    dueDate: dueDateStr,
    customerName: data.name || data.fullName || 'Valued Client',
    companyName: data.companyName || data.company || '',
    email: data.email || 'client@cloudloop.ae',
    phone: data.phone || data.mobile || '',
    country: data.country || 'United Arab Emirates',
    notes: data.message || data.details || data.notes || '',
    serviceType: type,
    items,
    subtotal,
    vat,
    discount,
    grandTotal,
  };
}

// -------------------------------------------------------------
// API Endpoints
// -------------------------------------------------------------

// Health Check Endpoint
app.get(['/api/health', '/health'], (req, res) => {
  res.json({
    status: 'ok',
    runtime: process.env.VERCEL ? 'Vercel Serverless' : 'Express Standalone Container',
    timestamp: new Date().toISOString(),
  });
});

// Dedicated Environment Variables Diagnostics Endpoint (Phase 2)
app.get(['/api/env-check', '/env-check'], (req, res) => {
  const rawUser = process.env.GMAIL_USER;
  const rawPass = process.env.GMAIL_APP_PASSWORD;
  const rawNotification = process.env.NOTIFICATION_EMAIL;

  const missingVars: string[] = [];
  if (!rawUser) missingVars.push('GMAIL_USER');
  if (!rawPass) missingVars.push('GMAIL_APP_PASSWORD');
  if (!rawNotification) missingVars.push('NOTIFICATION_EMAIL');

  return res.json({
    runtime: process.env.VERCEL ? 'Vercel Serverless' : 'Express Standalone Container',
    nodeVersion: process.version,
    environment: process.env.VERCEL_ENV || process.env.NODE_ENV || 'production',
    vercelEnv: process.env.VERCEL_ENV || 'N/A',
    vercelRegion: process.env.VERCEL_REGION || 'N/A',
    timestamp: new Date().toISOString(),
    env: {
      GMAIL_USER: !!rawUser,
      GMAIL_APP_PASSWORD: !!rawPass,
      NOTIFICATION_EMAIL: !!rawNotification,
    },
    missingVars,
    sanitizedPasswordLength: rawPass ? rawPass.replace(/\s+/g, '').length : 0,
    hasSpacesInPassword: rawPass ? /\s/.test(rawPass) : false,
  });
});

// SMTP Diagnostic Endpoint
app.get(['/api/email/status', '/email/status'], async (req, res) => {
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

  const meta = {
    runtime: process.env.VERCEL ? 'Vercel Serverless' : 'Express Standalone Container',
    nodeVersion: process.version,
    environment: process.env.VERCEL_ENV || process.env.NODE_ENV || 'production',
    vercelEnv: process.env.VERCEL_ENV || 'N/A',
    vercelRegion: process.env.VERCEL_REGION || 'N/A',
    timestamp: new Date().toISOString(),
  };

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
      meta,
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
      meta,
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
      meta,
      lastError: detailedMsg,
      totalLogs: emailLogs.length,
    });
  }
});

// Email Logs Endpoint
app.get(['/api/email/logs', '/email/logs'], (req, res) => {
  return res.json({ logs: emailLogs });
});

// Test Email Sending Endpoint
app.post(['/api/email/test-send', '/email/test-send'], async (req, res) => {
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
    const sampleInvoiceData = buildInvoiceDataFromSubmission(
      {
        name: 'Enterprise Diagnostic Client',
        companyName: 'Cloudloop Global Systems FZ-LLC',
        email: targetEmail,
        phone: '+971 50 123 4567',
        country: 'United Arab Emirates',
        message: 'Enterprise SMTP & PDF Invoice Integration Automated Test.',
        services: ['Free Zone & Mainland Business Setup', 'Corporate Tax & VAT Filing'],
      },
      'Enterprise Service Order Test'
    );

    const logoPath = path.join(process.cwd(), 'public', 'logo.png');
    const hasLogo = fs.existsSync(logoPath);
    const pdfBuffer = await generateInvoicePDF(sampleInvoiceData);

    const attachments: any[] = [];
    if (hasLogo) {
      attachments.push({
        filename: 'logo.png',
        path: logoPath,
        cid: 'cloudloop-logo',
      });
    }

    attachments.push({
      filename: `Cloudloop_Invoice_${sampleInvoiceData.invoiceNumber}.pdf`,
      content: pdfBuffer,
      contentType: 'application/pdf',
    });

    const info = await transporter.sendMail({
      from: `"Cloudloop Group UAE" <${process.env.GMAIL_USER || 'mailtocloudloop@gmail.com'}>`,
      to: targetEmail,
      subject: `[Cloudloop Test Invoice] Service Order Confirmation #${sampleInvoiceData.invoiceNumber}`,
      html: generateCustomerConfirmationEmailHTML(sampleInvoiceData, 'Enterprise Service Test'),
      attachments,
    });

    addEmailLog({
      type: 'Enterprise SMTP Test & PDF Dispatch',
      recipient: targetEmail,
      subject: `Service Order Confirmation #${sampleInvoiceData.invoiceNumber}`,
      status: 'success',
      details: { messageId: info.messageId, invoiceNumber: sampleInvoiceData.invoiceNumber, pdfAttached: true },
    });

    return res.json({
      success: true,
      message: `Test enterprise confirmation email with PDF invoice dispatched successfully to ${targetEmail}`,
      messageId: info.messageId,
      invoiceNumber: sampleInvoiceData.invoiceNumber,
    });
  } catch (error: any) {
    const errorMsg = error.message || String(error);
    addEmailLog({
      type: 'Enterprise SMTP Test & PDF Dispatch',
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

  const invoiceData = buildInvoiceDataFromSubmission(data, type);

  let pdfBuffer: Buffer | null = null;
  try {
    pdfBuffer = await generateInvoicePDF(invoiceData);
  } catch (pdfErr) {
    console.error('[PDF Generation Error]:', pdfErr);
  }

  const logoPath = path.join(process.cwd(), 'public', 'logo.png');
  const hasLogo = fs.existsSync(logoPath);

  const commonAttachments: any[] = [];
  if (hasLogo) {
    commonAttachments.push({
      filename: 'logo.png',
      path: logoPath,
      cid: 'cloudloop-logo',
    });
  }

  const customerAttachments = [...commonAttachments];
  if (pdfBuffer) {
    customerAttachments.push({
      filename: `Cloudloop_Invoice_${invoiceData.invoiceNumber}.pdf`,
      content: pdfBuffer,
      contentType: 'application/pdf',
    });
  }

  let adminMailSuccess = false;
  let clientMailSuccess = false;
  let lastErrorMessage = '';

  if (transporter) {
    // 1. Send Admin Email
    try {
      const adminSubject = `[Cloudloop Service Order] ${type.toUpperCase()} from ${invoiceData.customerName} (${invoiceData.invoiceNumber})`;
      await transporter.sendMail({
        from: `"Cloudloop Web Desk" <${process.env.GMAIL_USER || 'mailtocloudloop@gmail.com'}>`,
        to: adminTarget,
        subject: adminSubject,
        html: generateAdminOrderEmailHTML(invoiceData, data, type),
        attachments: commonAttachments,
      });
      adminMailSuccess = true;

      addEmailLog({
        type: `Admin Notification (${type})`,
        recipient: adminTarget,
        subject: adminSubject,
        status: 'success',
        details: { invoiceNumber: invoiceData.invoiceNumber, customer: invoiceData.customerName, total: invoiceData.grandTotal },
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
        const clientSubject = `Confirmation: Service Order #${invoiceData.invoiceNumber} - Cloudloop Group UAE`;
        await transporter.sendMail({
          from: `"Cloudloop Group UAE" <${process.env.GMAIL_USER || 'mailtocloudloop@gmail.com'}>`,
          to: clientEmail,
          subject: clientSubject,
          html: generateCustomerConfirmationEmailHTML(invoiceData, type),
          attachments: customerAttachments,
        });
        clientMailSuccess = true;

        addEmailLog({
          type: `Customer Confirmation (${type})`,
          recipient: clientEmail,
          subject: clientSubject,
          status: 'success',
          details: { invoiceNumber: invoiceData.invoiceNumber, pdfAttached: !!pdfBuffer },
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

  if (adminMailSuccess || clientMailSuccess) {
    return res.status(200).json({
      success: true,
      message: `${type} submitted and emails processed successfully!`,
      invoiceNumber: invoiceData.invoiceNumber,
      emailStatus: { adminMailSuccess, clientMailSuccess },
    });
  } else {
    return res.status(200).json({
      success: true,
      message: `${type} received! Note: Email dispatch status: ${lastErrorMessage || 'Logged'}`,
      invoiceNumber: invoiceData.invoiceNumber,
      emailStatus: { adminMailSuccess: false, clientMailSuccess: false, error: lastErrorMessage },
    });
  }
}

app.post(['/api/contact', '/contact'], (req, res) => handleSubmission(req, res, 'Contact Form'));
app.post(['/api/consultation', '/consultation'], (req, res) => handleSubmission(req, res, 'Consultation Booking'));
app.post(['/api/quote', '/quote'], (req, res) => handleSubmission(req, res, 'Quote Request'));
app.post(['/api/newsletter', '/newsletter'], (req, res) => handleSubmission(req, res, 'Newsletter Subscription'));
app.post(['/api/career-apply', '/career-apply'], (req, res) => handleSubmission(req, res, 'Career Application'));

// -------------------------------------------------------------
// Vite Middleware / Static Server Integration & Global Error Handling
// -------------------------------------------------------------

// Global Express Error Handler to prevent raw HTML server error outputs
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('[API Error]:', err);
  if (!res.headersSent) {
    res.setHeader('Content-Type', 'application/json');
    res.status(500).json({
      success: false,
      error: err.message || 'Internal Server Error',
    });
  }
});

// Fallback for non-existent API routes to ensure JSON response
app.use('/api/*', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.status(404).json({
    success: false,
    error: `API route ${req.originalUrl} not found`,
  });
});

async function start() {
  if (process.env.NODE_ENV !== 'production' && !process.env.VERCEL) {
    try {
      const { createServer: createViteServer } = await import('vite');
      const vite = await createViteServer({
        server: { middlewareMode: true },
        appType: 'spa',
      });
      app.use(vite.middlewares);
    } catch (err) {
      console.warn('Vite middleware skipped:', err);
    }
  } else if (!process.env.VERCEL) {
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

// Start standalone server only when executed directly (not inside Vercel serverless)
if (process.env.VERCEL !== '1' && process.env.VERCEL !== 'true') {
  start();
}
