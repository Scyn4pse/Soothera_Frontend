import { InvoiceCalculations, InvoiceItem } from '../types/Invoice';

/**
 * Calculate VAT (Inclusive) invoice breakdown
 * Example: If customer pays 1,000.00 (Gross Amount)
 * - Vatable Sales: 1,000 ÷ 1.12 = 892.86
 * - VAT (12%): 892.86 * 0.12 = 107.14
 * - Total Amount: 1,000.00 (892.86 + 107.14)
 */
export function calculateVATInclusive(
  grossAmount: number,
  vatRate: number = 0.12,
  discounts: number = 0
): InvoiceCalculations {
  // Apply discounts first
  const amountAfterDiscount = grossAmount - discounts;
  
  // Calculate vatable sales (base amount before VAT)
  const vatableSales = amountAfterDiscount / (1 + vatRate);
  
  // Calculate VAT amount
  const vatAmount = vatableSales * vatRate;
  
  // Total should equal gross amount
  const totalAmountDue = vatableSales + vatAmount;
  
  return {
    grossAmount,
    vatableSales: Number(vatableSales.toFixed(2)),
    vatAmount: Number(vatAmount.toFixed(2)),
    vatRate,
    discounts,
    totalAmountDue: Number(totalAmountDue.toFixed(2)),
    isVAT: true,
  };
}

/**
 * Calculate Non-VAT invoice breakdown
 * Example: If customer pays 1,000.00 (Gross Amount)
 * - Total Sales: 1,000.00
 * - Less: Discounts (if any): 0.00
 * - Total Amount Due: 1,000.00
 */
export function calculateNonVAT(
  grossAmount: number,
  discounts: number = 0
): InvoiceCalculations {
  const totalSales = grossAmount;
  const totalAmountDue = totalSales - discounts;
  
  return {
    grossAmount,
    totalSales: Number(totalSales.toFixed(2)),
    discounts: Number(discounts.toFixed(2)),
    totalAmountDue: Number(totalAmountDue.toFixed(2)),
    isVAT: false,
  };
}

/**
 * Calculate invoice from items
 */
export function calculateInvoiceFromItems(
  items: InvoiceItem[],
  isVAT: boolean = false,
  vatRate: number = 0.12,
  discounts: number = 0
): InvoiceCalculations {
  // Calculate subtotal from items
  const subtotal = items.reduce((sum, item) => sum + item.total, 0);
  
  if (isVAT) {
    return calculateVATInclusive(subtotal, vatRate, discounts);
  } else {
    return calculateNonVAT(subtotal, discounts);
  }
}

/**
 * Format currency to Philippine Peso
 */
export function formatCurrency(amount: number): string {
  return `₱${amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`;
}

/**
 * Format date to readable string
 */
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
