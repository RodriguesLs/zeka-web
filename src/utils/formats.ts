import { format } from 'date-fns';

export const formatDate = (date: Date, mask = 'dd/MM/yyyy') => {
  return format(new Date(date), mask);
};

export const formatPhoneNumber = (number: string | number) => {
  const numberFormatted = String(number).replace(/^(\d\d)(\d{5})(\d{4}).*/, '($1) $2-$3');

  return numberFormatted;
};

export const formatCpf = (value: string | number) => {
  const valueToString = String(value).replace(/\D/g, '');

  if (!(valueToString.length === 11)) return;

  const cpfFormatted = String(value).replace(/^(\d{3})(\d{3})(\d{3})(\d{2}).*/, '$1.$2.$3-$4');

  return cpfFormatted;
};
