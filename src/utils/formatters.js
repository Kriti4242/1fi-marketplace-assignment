export function formatCurrency(amount) {
  if (amount === undefined || amount === null || isNaN(amount)) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(Math.round(amount));
}

/* Format compact currency e.g., 100000 -> "₹1 Lakh"*/
export function formatCompactCurrency(amount) {
  if (!amount) return '₹0';
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(1).replace(/\.0$/, '')} Lakh`;
  }
  return formatCurrency(amount);
}

/* Format percentage discount*/
export function formatDiscount(percentage) {
  if (!percentage || percentage <= 0) return null;
  return `${Math.round(percentage)}% OFF`;
}

/* Format date for EMI schedules e.g., "5th Oct 2026"*/
export function formatEmiDate(date = new Date()) {
  const d = new Date(date);
  const day = d.getDate();
  const suffix = ['th', 'st', 'nd', 'rd'][(day % 10 > 3 || Math.floor((day % 100) / 10) === 1) ? 0 : day % 10];
  const month = d.toLocaleString('en-IN', { month: 'short' });
  const year = d.getFullYear();
  return `${day}${suffix} ${month} ${year}`;
}
