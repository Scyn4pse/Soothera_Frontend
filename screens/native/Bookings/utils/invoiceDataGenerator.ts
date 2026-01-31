import { BookingDetails } from '../types/BookingDetails';
import { InvoiceData, InvoiceItem } from '../types/Invoice';
import { calculateVATInclusive, calculateNonVAT } from './invoiceCalculations';

/**
 * Generate invoice data from booking details
 */
export function generateInvoiceFromBooking(
  bookingDetails: BookingDetails,
  options: {
    isVAT?: boolean;
    vatRate?: number;
    discounts?: number;
    customerName?: string;
    customerAddress?: string;
    customerEmail?: string;
    customerPhone?: string;
    businessName?: string;
    businessAddress?: string;
    businessPhone?: string;
    businessEmail?: string;
    businessTIN?: string;
    notes?: string;
  } = {}
): InvoiceData {
  const {
    isVAT = false,
    vatRate = 0.12,
    discounts = 0,
    customerName,
    customerAddress,
    customerEmail,
    customerPhone,
    businessName = 'Soothera',
    businessAddress = 'Cebu, Philippines',
    businessPhone,
    businessEmail,
    businessTIN,
    notes,
  } = options;

  // Generate invoice number (format: INV-YYYYMMDD-XXX)
  const now = new Date();
  const invoiceNumber = `INV-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}`;

  // Create invoice items
  const items: InvoiceItem[] = [
    {
      description: bookingDetails.serviceName,
      quantity: 1,
      unitPrice: bookingDetails.price,
      total: bookingDetails.price,
    },
  ];

  // Calculate invoice totals
  const grossAmount = bookingDetails.price;
  const calculations = isVAT
    ? calculateVATInclusive(grossAmount, vatRate, discounts)
    : calculateNonVAT(grossAmount, discounts);

  return {
    ...bookingDetails,
    invoiceNumber,
    invoiceDate: now.toISOString(),
    items,
    calculations,
    customerName,
    customerAddress,
    customerEmail,
    customerPhone,
    businessName,
    businessAddress,
    businessPhone,
    businessEmail,
    businessTIN,
    notes,
  };
}
