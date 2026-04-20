import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrency(value: number, currency: 'BRL' | 'USD') {
  return new Intl.NumberFormat(currency === 'BRL' ? 'pt-BR' : 'en-US', {
    style: 'currency',
    currency: currency,
  }).format(value)
}

export function formatInstallments(value: number, currency: 'BRL' | 'USD') {
  if (currency === 'USD') return ''
  const installment = value / 12
  return `em até 12x de ${formatCurrency(installment, 'BRL')} sem juros`
}
