import { format } from 'date-fns';

const formatDate = (date: Date, mask = 'dd/MM/yyyy') => {
  return format(new Date(date), mask);
};

export default formatDate;
