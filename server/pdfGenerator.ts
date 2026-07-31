import PDFDocument from 'pdfkit';
import path from 'path';
import fs from 'fs';

export interface ServiceItem {
  name: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

export interface InvoiceData {
  invoiceNumber: string;
  date: string;
  dueDate: string;
  customerName: string;
  companyName?: string;
  email: string;
  phone?: string;
  country?: string;
  notes?: string;
  serviceType: string;
  items: ServiceItem[];
  subtotal: number;
  vat: number;
  discount: number;
  grandTotal: number;
}

export function formatAED(amount: number): string {
  return `AED ${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export async function generateInvoicePDF(data: InvoiceData): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 40, size: 'A4' });
      const buffers: Buffer[] = [];

      doc.on('data', (chunk) => buffers.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(buffers)));
      doc.on('error', (err) => reject(err));

      const logoPath = path.join(process.cwd(), 'public', 'logo.png');
      const hasLogo = fs.existsSync(logoPath);

      // --- Dark Header Banner ---
      doc.rect(0, 0, 595.28, 110).fill('#0f172a');

      // Add Logo or Brand Title inside dark header
      if (hasLogo) {
        try {
          doc.image(logoPath, 40, 25, { width: 140 });
        } catch {
          doc.fillColor('#ffffff').fontSize(22).font('Helvetica-Bold').text('CLOUDLOOP', 40, 35);
          doc.fillColor('#38bdf8').fontSize(12).font('Helvetica').text('GROUP UAE', 40, 62);
        }
      } else {
        doc.fillColor('#ffffff').fontSize(22).font('Helvetica-Bold').text('CLOUDLOOP', 40, 35);
        doc.fillColor('#38bdf8').fontSize(12).font('Helvetica').text('GROUP UAE', 40, 62);
      }

      // Top Right Header Info inside dark header
      doc.fillColor('#ffffff').fontSize(18).font('Helvetica-Bold').text('INVOICE / QUOTE', 350, 30, { align: 'right', width: 205 });
      doc.fillColor('#94a3b8').fontSize(9).font('Helvetica').text(`Invoice #: ${data.invoiceNumber}`, 350, 54, { align: 'right', width: 205 });
      doc.text(`Date: ${data.date}`, 350, 68, { align: 'right', width: 205 });
      doc.text(`TRN: 100489201900003`, 350, 82, { align: 'right', width: 205 });

      // Reset fill color for body
      doc.fillColor('#0f172a');

      let y = 130;

      // --- Billing Details Grid ---
      // Left: Customer (Billed To)
      doc.fontSize(10).font('Helvetica-Bold').fillColor('#0284c7').text('BILLED TO', 40, y);
      doc.fontSize(11).font('Helvetica-Bold').fillColor('#0f172a').text(data.customerName || 'Valued Client', 40, y + 16);
      
      let clientInfoY = y + 32;
      doc.fontSize(9).font('Helvetica').fillColor('#334155');
      if (data.companyName) {
        doc.text(`Company: ${data.companyName}`, 40, clientInfoY);
        clientInfoY += 14;
      }
      doc.text(`Email: ${data.email}`, 40, clientInfoY);
      clientInfoY += 14;
      if (data.phone) {
        doc.text(`Phone: ${data.phone}`, 40, clientInfoY);
        clientInfoY += 14;
      }
      doc.text(`Country: ${data.country || 'United Arab Emirates'}`, 40, clientInfoY);

      // Right: Billed From (Cloudloop Details)
      doc.fontSize(10).font('Helvetica-Bold').fillColor('#0284c7').text('ISSUED BY', 320, y);
      doc.fontSize(11).font('Helvetica-Bold').fillColor('#0f172a').text('Cloudloop Group LLC', 320, y + 16);
      doc.fontSize(9).font('Helvetica').fillColor('#334155');
      doc.text('Documents Clearing & IT Services Division', 320, y + 32);
      doc.text('Level 18, Business Bay Tower, Sheikh Zayed Rd', 320, y + 46);
      doc.text('Dubai, United Arab Emirates', 320, y + 60);
      doc.text('Email: info@cloudloop.ae | Phone: +971 4 800 5667', 320, y + 74);

      y = Math.max(clientInfoY + 20, y + 96);

      // Status pill box
      doc.rect(40, y, 515, 26).fillAndStroke('#f0f9ff', '#bae6fd');
      doc.fillColor('#0369a1').fontSize(9).font('Helvetica-Bold').text(`Status: Service Request Registered | Due Date: ${data.dueDate}`, 50, y + 8);

      y += 40;

      // --- Service Table Header ---
      doc.rect(40, y, 515, 22).fill('#0f172a');
      doc.fillColor('#ffffff').fontSize(9).font('Helvetica-Bold');
      doc.text('SERVICE / ITEM DESCRIPTION', 50, y + 6, { width: 230 });
      doc.text('QTY', 280, y + 6, { width: 40, align: 'center' });
      doc.text('UNIT PRICE', 330, y + 6, { width: 100, align: 'right' });
      doc.text('TOTAL (AED)', 440, y + 6, { width: 105, align: 'right' });

      y += 22;

      // Table Rows
      doc.font('Helvetica').fontSize(9);
      data.items.forEach((item, idx) => {
        const rowBg = idx % 2 === 0 ? '#ffffff' : '#f8fafc';
        doc.rect(40, y, 515, 24).fillAndStroke(rowBg, '#e2e8f0');

        doc.fillColor('#1e293b').text(item.name, 50, y + 7, { width: 220, ellipsis: true });
        doc.fillColor('#334155').text(String(item.quantity), 280, y + 7, { width: 40, align: 'center' });
        doc.text(formatAED(item.unitPrice), 330, y + 7, { width: 100, align: 'right' });
        doc.fillColor('#0f172a').font('Helvetica-Bold').text(formatAED(item.total), 440, y + 7, { width: 105, align: 'right' });

        doc.font('Helvetica');
        y += 24;
      });

      y += 10;

      // --- Financial Totals Box ---
      const totalBoxX = 330;
      const totalBoxWidth = 225;

      // Subtotal
      doc.fillColor('#475569').fontSize(9).font('Helvetica').text('Subtotal:', totalBoxX, y, { width: 100, align: 'right' });
      doc.fillColor('#0f172a').font('Helvetica-Bold').text(formatAED(data.subtotal), totalBoxX + 105, y, { width: 120, align: 'right' });
      y += 16;

      // VAT 5%
      doc.fillColor('#475569').font('Helvetica').text('UAE VAT (5%):', totalBoxX, y, { width: 100, align: 'right' });
      doc.fillColor('#0f172a').font('Helvetica-Bold').text(formatAED(data.vat), totalBoxX + 105, y, { width: 120, align: 'right' });
      y += 16;

      if (data.discount > 0) {
        doc.fillColor('#15803d').font('Helvetica').text('Discount:', totalBoxX, y, { width: 100, align: 'right' });
        doc.fillColor('#15803d').font('Helvetica-Bold').text(`-${formatAED(data.discount)}`, totalBoxX + 105, y, { width: 120, align: 'right' });
        y += 16;
      }

      // Line separator
      doc.moveTo(totalBoxX, y).lineTo(totalBoxX + totalBoxWidth, y).strokeColor('#cbd5e1').stroke();
      y += 6;

      // Grand Total Highlight
      doc.rect(totalBoxX, y, totalBoxWidth, 26).fill('#0f172a');
      doc.fillColor('#ffffff').fontSize(10).font('Helvetica-Bold').text('GRAND TOTAL:', totalBoxX + 10, y + 8);
      doc.fillColor('#38bdf8').fontSize(11).font('Helvetica-Bold').text(formatAED(data.grandTotal), totalBoxX + 100, y + 8, { width: 115, align: 'right' });

      y += 45;

      // --- Notes & Terms Section ---
      doc.fillColor('#0f172a').fontSize(9).font('Helvetica-Bold').text('Terms & Payment Guidelines:', 40, y);
      y += 12;
      doc.fillColor('#64748b').fontSize(8).font('Helvetica');
      doc.text('1. This invoice / quotation is generated automatically upon service request registration.', 40, y);
      doc.text('2. All prices are in UAE Dirhams (AED) and include 5% UAE Value Added Tax (VAT).', 40, y + 11);
      doc.text('3. Payment can be executed via Corporate Bank Wire, Credit Card, or Manager Cheque upon contract execution.', 40, y + 22);
      doc.text('4. For customized scope adjustments or tax exemptions, contact your dedicated Cloudloop Account Manager.', 40, y + 33);

      // --- Page Footer ---
      const pageHeight = 841.89; // A4 height
      doc.moveTo(40, pageHeight - 50).lineTo(555.28, pageHeight - 50).strokeColor('#e2e8f0').stroke();
      doc.fillColor('#0284c7').fontSize(9).font('Helvetica-Bold').text('Cloudloop Group LLC', 40, pageHeight - 40);
      doc.fillColor('#94a3b8').fontSize(8).font('Helvetica').text('Thank you for choosing Cloudloop as your trusted technology & business expansion partner.', 40, pageHeight - 28);
      doc.text('www.cloudloop.ae | Page 1 of 1', 350, pageHeight - 28, { align: 'right', width: 205 });

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
}
