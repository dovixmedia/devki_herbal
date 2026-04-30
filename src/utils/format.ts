/**
 * Formats a number as a currency string.
 * Default is Indian Rupee (₹).
 */
export function formatPrice(price: number): string {
  // Use 'en-IN' locale for Indian numbering system (comma placement)
  // But simplify to just prefixing if preferred. 
  // Given the user's specific request "remove dollar and add indian rupees sign", 
  // I'll ensure the symbol is correct.
  
  return `₹${Math.round(price).toLocaleString('en-IN')}`;
}

/**
 * Formats a number with decimals if needed, or rounds if requested.
 * For this project, we'll keep it simple as ₹999.
 */
export function formatCurrency(amount: number): string {
  return `₹${amount.toLocaleString('en-IN', {
    maximumFractionDigits: 2,
    minimumFractionDigits: 0,
  })}`;
}
