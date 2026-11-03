import { InvoiceData, formatAED } from './pdfGenerator';

export function getHeaderHTML(): string {
  return `
    <!-- Enterprise Dark Navy Header for High Logo Contrast -->
    <tr>
      <td style="background-color: #0b0f19; padding: 32px 30px; text-align: center; border-bottom: 2px solid #0284c7;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td align="center">
              <img src="cid:cloudloop-logo" alt="Cloudloop Group" style="max-width: 170px; height: auto; display: block; border: 0;" />
            </td>
          </tr>
          <tr>
            <td align="center" style="padding-top: 10px;">
              <span style="color: #94a3b8; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 11px; font-weight: 700; letter-spacing: 2.5px; text-transform: uppercase;">
                DOCUMENTS CLEARING & IT SERVICES DIVISION • UAE
              </span>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  `;
}

export function getFooterHTML(): string {
  return `
    <!-- Enterprise Footer -->
    <tr>
      <td style="background-color: #070a12; padding: 28px 30px; text-align: center; border-top: 1px solid #1e293b; color: #64748b; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; font-size: 12px; line-height: 1.6;">
        <p style="margin: 0 0 8px 0; color: #94a3b8; font-weight: 600;">Cloudloop Group LLC • Office No: 1001-04, Rigga Business Centre, Ibis Hotel, Dubai, UAE</p>
        <p style="margin: 0 0 12px 0;">TRN: 100489201900003 | Phone: +971 55 612 6050 | Email: support@cloudloop.ae</p>
        <div style="margin: 12px 0;">
          <a href="https://cloudloop.ae" style="color: #38bdf8; text-decoration: none; font-weight: 600; margin: 0 8px;">Website</a> •
          <a href="https://wa.me/971556126050" style="color: #25d366; text-decoration: none; font-weight: 600; margin: 0 8px;">WhatsApp Desk</a> •
          <a href="https://linkedin.com" style="color: #38bdf8; text-decoration: none; font-weight: 600; margin: 0 8px;">LinkedIn</a>
        </div>
        <p style="margin: 12px 0 0 0; font-size: 11px; color: #475569;">© ${new Date().getFullYear()} Cloudloop Group LLC. All Rights Reserved. Confidential Corporate Communication.</p>
      </td>
    </tr>
  `;
}

export function generateAdminOrderEmailHTML(invoiceData: InvoiceData, rawData: any, type: string): string {
  const serviceRowsHTML = invoiceData.items
    .map(
      (item) => `
      <tr style="border-bottom: 1px solid #e2e8f0;">
        <td style="padding: 12px 14px; font-size: 13px; font-weight: 600; color: #0f172a;">${item.name}</td>
        <td style="padding: 12px 14px; font-size: 13px; color: #334155; text-align: center;">${item.quantity}</td>
        <td style="padding: 12px 14px; font-size: 13px; color: #334155; text-align: right;">${formatAED(item.unitPrice)}</td>
        <td style="padding: 12px 14px; font-size: 13px; font-weight: 700; color: #0f172a; text-align: right;">${formatAED(item.total)}</td>
      </tr>
    `
    )
    .join('');

  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <title>Admin Order Alert - ${type}</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #020617; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #020617; padding: 30px 15px;">
      <tr>
        <td align="center">
          <table width="640" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 25px 50px rgba(0,0,0,0.5);">
            ${getHeaderHTML()}
            
            <!-- Body Content -->
            <tr>
              <td style="padding: 36px 30px;">
                <div style="margin-bottom: 20px;">
                  <span style="display: inline-block; padding: 6px 14px; background-color: #f0f9ff; border: 1px solid #0284c7; color: #0284c7; font-size: 11px; font-weight: 800; border-radius: 20px; text-transform: uppercase; letter-spacing: 1px;">
                    ⚡ NEW ${type.toUpperCase()} SUBMISSION
                  </span>
                </div>

                <h2 style="margin: 0 0 6px 0; color: #0f172a; font-size: 22px; font-weight: 800;">Order & Inquiry Summary</h2>
                <p style="margin: 0 0 24px 0; color: #64748b; font-size: 13px;">Invoice #: <strong style="color: #0284c7;">${invoiceData.invoiceNumber}</strong> • Received on ${invoiceData.date}</p>

                <!-- Customer Details Card -->
                <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin-bottom: 28px;">
                  <h3 style="margin: 0 0 14px 0; color: #0284c7; font-size: 14px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px;">👤 Customer Information</h3>
                  <table width="100%" cellpadding="0" cellspacing="0" style="font-size: 13px; line-height: 1.6; color: #334155;">
                    <tr>
                      <td width="35%" style="padding: 4px 0; font-weight: 700; color: #475569;">Full Name:</td>
                      <td style="padding: 4px 0; font-weight: 600; color: #0f172a;">${invoiceData.customerName || 'N/A'}</td>
                    </tr>
                    ${
                      invoiceData.companyName
                        ? `<tr>
                      <td style="padding: 4px 0; font-weight: 700; color: #475569;">Company Name:</td>
                      <td style="padding: 4px 0; font-weight: 600; color: #0f172a;">${invoiceData.companyName}</td>
                    </tr>`
                        : ''
                    }
                    <tr>
                      <td style="padding: 4px 0; font-weight: 700; color: #475569;">Email Address:</td>
                      <td style="padding: 4px 0;"><a href="mailto:${invoiceData.email}" style="color: #0284c7; text-decoration: none; font-weight: 700;">${invoiceData.email}</a></td>
                    </tr>
                    <tr>
                      <td style="padding: 4px 0; font-weight: 700; color: #475569;">Phone Number:</td>
                      <td style="padding: 4px 0; font-weight: 600; color: #0f172a;">${invoiceData.phone || 'N/A'}</td>
                    </tr>
                    <tr>
                      <td style="padding: 4px 0; font-weight: 700; color: #475569;">Country:</td>
                      <td style="padding: 4px 0; font-weight: 600; color: #0f172a;">${invoiceData.country || 'United Arab Emirates'}</td>
                    </tr>
                    ${
                      invoiceData.notes
                        ? `<tr>
                      <td style="padding: 8px 0 4px 0; font-weight: 700; color: #475569; vertical-align: top;">Notes/Message:</td>
                      <td style="padding: 8px 0 4px 0; color: #0f172a; font-style: italic; background-color: #ffffff; padding: 10px; border-radius: 6px; border: 1px solid #e2e8f0;">"${invoiceData.notes}"</td>
                    </tr>`
                        : ''
                    }
                  </table>
                </div>

                <!-- Services Table -->
                <h3 style="margin: 0 0 12px 0; color: #0f172a; font-size: 15px; font-weight: 800;">Services Requested Breakdown</h3>
                <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; border: 1px solid #e2e8f0; border-radius: 10px; overflow: hidden; margin-bottom: 20px;">
                  <thead>
                    <tr style="background-color: #0f172a; color: #ffffff;">
                      <th style="padding: 12px 14px; font-size: 12px; font-weight: 700; text-align: left; text-transform: uppercase;">Service</th>
                      <th style="padding: 12px 14px; font-size: 12px; font-weight: 700; text-align: center; text-transform: uppercase;">Qty</th>
                      <th style="padding: 12px 14px; font-size: 12px; font-weight: 700; text-align: right; text-transform: uppercase;">Unit Price</th>
                      <th style="padding: 12px 14px; font-size: 12px; font-weight: 700; text-align: right; text-transform: uppercase;">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${serviceRowsHTML}
                  </tbody>
                </table>

                <!-- Financial Breakdown -->
                <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 28px;">
                  <tr>
                    <td width="50%"></td>
                    <td width="50%">
                      <table width="100%" cellpadding="4" cellspacing="0" style="font-size: 13px; color: #334155;">
                        <tr>
                          <td style="text-align: right; font-weight: 600;">Subtotal:</td>
                          <td style="text-align: right; font-weight: 700; color: #0f172a;">${formatAED(invoiceData.subtotal)}</td>
                        </tr>
                        <tr>
                          <td style="text-align: right; font-weight: 600;">VAT (5%):</td>
                          <td style="text-align: right; font-weight: 700; color: #0f172a;">${formatAED(invoiceData.vat)}</td>
                        </tr>
                        ${
                          invoiceData.discount > 0
                            ? `<tr>
                          <td style="text-align: right; font-weight: 600; color: #16a34a;">Discount:</td>
                          <td style="text-align: right; font-weight: 700; color: #16a34a;">-${formatAED(invoiceData.discount)}</td>
                        </tr>`
                            : ''
                        }
                        <tr>
                          <td style="text-align: right; font-weight: 800; font-size: 15px; color: #0f172a; padding-top: 8px; border-top: 2px solid #0f172a;">Grand Total:</td>
                          <td style="text-align: right; font-weight: 800; font-size: 16px; color: #0284c7; padding-top: 8px; border-top: 2px solid #0f172a;">${formatAED(invoiceData.grandTotal)}</td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>

                <!-- Quick Action Button -->
                <div style="text-align: center; margin-top: 20px;">
                  <a href="mailto:${invoiceData.email}?subject=RE:%20Cloudloop%20Service%20Order%20${invoiceData.invoiceNumber}" style="display: inline-block; padding: 14px 28px; background-color: #0284c7; color: #ffffff; font-size: 14px; font-weight: 700; text-decoration: none; border-radius: 10px; box-shadow: 0 4px 12px rgba(2,132,199,0.3);">
                    📩 Reply Directly to ${invoiceData.customerName || 'Client'}
                  </a>
                </div>
              </td>
            </tr>

            ${getFooterHTML()}
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
}

export function generateCustomerConfirmationEmailHTML(invoiceData: InvoiceData, type: string): string {
  const serviceRowsHTML = invoiceData.items
    .map(
      (item) => `
      <tr style="border-bottom: 1px solid #e2e8f0;">
        <td style="padding: 12px 14px; font-size: 13px; font-weight: 600; color: #0f172a;">${item.name}</td>
        <td style="padding: 12px 14px; font-size: 13px; color: #334155; text-align: center;">${item.quantity}</td>
        <td style="padding: 12px 14px; font-size: 13px; font-weight: 700; color: #0f172a; text-align: right;">${formatAED(item.total)}</td>
      </tr>
    `
    )
    .join('');

  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <title>Service Request Confirmation - Cloudloop Group</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #020617; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #020617; padding: 30px 15px;">
      <tr>
        <td align="center">
          <table width="640" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 25px 50px rgba(0,0,0,0.5);">
            ${getHeaderHTML()}

            <!-- Main Content -->
            <tr>
              <td style="padding: 36px 30px;">
                <h2 style="margin: 0 0 12px 0; color: #0f172a; font-size: 22px; font-weight: 800;">Dear ${invoiceData.customerName || 'Valued Client'},</h2>
                <p style="margin: 0 0 20px 0; font-size: 15px; line-height: 1.6; color: #334155;">
                  Thank you for placing your request with <strong>Cloudloop Group UAE</strong>. We have successfully registered your <strong>${type}</strong> order under reference number <strong style="color: #0284c7;">${invoiceData.invoiceNumber}</strong>.
                </p>

                <p style="margin: 0 0 24px 0; font-size: 14px; line-height: 1.6; color: #475569;">
                  📎 <strong>Attached Pro-Forma Invoice:</strong> A official PDF copy of your service invoice (<strong>Cloudloop_Invoice_${invoiceData.invoiceNumber}.pdf</strong>) is attached to this email for your records.
                </p>

                <!-- Service Breakdown Card -->
                <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
                  <h3 style="margin: 0 0 12px 0; color: #0284c7; font-size: 14px; font-weight: 800; text-transform: uppercase;">Order Summary</h3>
                  <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse: collapse; border: 1px solid #cbd5e1; border-radius: 8px; overflow: hidden; margin-bottom: 16px;">
                    <thead>
                      <tr style="background-color: #0f172a; color: #ffffff;">
                        <th style="padding: 10px 12px; font-size: 12px; font-weight: 700; text-align: left;">Service</th>
                        <th style="padding: 10px 12px; font-size: 12px; font-weight: 700; text-align: center;">Qty</th>
                        <th style="padding: 10px 12px; font-size: 12px; font-weight: 700; text-align: right;">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${serviceRowsHTML}
                    </tbody>
                  </table>

                  <table width="100%" cellpadding="3" cellspacing="0" style="font-size: 13px; color: #334155;">
                    <tr>
                      <td style="text-align: right; font-weight: 600;">Subtotal:</td>
                      <td style="text-align: right; font-weight: 700; color: #0f172a; width: 120px;">${formatAED(invoiceData.subtotal)}</td>
                    </tr>
                    <tr>
                      <td style="text-align: right; font-weight: 600;">VAT (5%):</td>
                      <td style="text-align: right; font-weight: 700; color: #0f172a;">${formatAED(invoiceData.vat)}</td>
                    </tr>
                    <tr>
                      <td style="text-align: right; font-weight: 800; font-size: 15px; color: #0f172a; padding-top: 6px; border-top: 2px solid #0f172a;">Total Amount:</td>
                      <td style="text-align: right; font-weight: 800; font-size: 16px; color: #0284c7; padding-top: 6px; border-top: 2px solid #0f172a;">${formatAED(invoiceData.grandTotal)}</td>
                    </tr>
                  </table>
                </div>

                <!-- Next Steps Banner -->
                <div style="background-color: #f0f9ff; border-left: 4px solid #0284c7; padding: 20px; border-radius: 8px; margin-bottom: 28px;">
                  <h3 style="margin: 0 0 8px 0; color: #0369a1; font-size: 15px; font-weight: 700;">📋 What Are Your Next Steps?</h3>
                  <ul style="margin: 0; padding-left: 20px; color: #0c4a6e; font-size: 14px; line-height: 1.6;">
                    <li>A senior executive consultant has been assigned to your case and will review your file within <strong>2 business hours</strong>.</li>
                    <li>We will reach out via email or phone (+971) to finalize documentation and implementation timelines.</li>
                    <li>If you require immediate expedited processing, connect directly with our Dubai desk on WhatsApp below.</li>
                  </ul>
                </div>

                <!-- CTA Buttons -->
                <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
                  <tr>
                    <td align="center">
                      <a href="https://wa.me/971556126050?text=Hello%20Cloudloop%20Group,%20I%20have%20submitted%20order%20${invoiceData.invoiceNumber}" style="display: inline-block; padding: 14px 28px; background-color: #25d366; color: #ffffff; font-weight: 700; font-size: 14px; text-decoration: none; border-radius: 10px; box-shadow: 0 4px 12px rgba(37,211,102,0.3);">
                        💬 Connect Instantly on WhatsApp (+971 55 612 6050)
                      </a>
                    </td>
                  </tr>
                </table>

                <p style="margin: 0; font-size: 13px; line-height: 1.6; color: #64748b;">
                  Best Regards,<br />
                  <strong style="color: #0f172a;">Cloudloop Group Client Services Desk</strong><br />
                  Dubai, United Arab Emirates
                </p>
              </td>
            </tr>

            ${getFooterHTML()}
          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `;
}
