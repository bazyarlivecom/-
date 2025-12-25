
/**
 * Validates Iranian National ID (Melli Code)
 */
export const isValidNationalId = (code: string): boolean => {
  if (!/^\d{10}$/.test(code)) return false;

  const check = parseInt(code[9]);
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(code[i]) * (10 - i);
  }
  const remainder = sum % 11;

  return (remainder < 2 && check === remainder) || (remainder >= 2 && check === 11 - remainder);
};

export const formatPersianDate = (timestamp: number): string => {
  return new Intl.DateTimeFormat('fa-IR', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(timestamp));
};
