import { distanceInWordsToNow } from 'date-fns';

const locale = require('date-fns/locale/tr');

export default function formatDate(date) {
  const formatted = distanceInWordsToNow(date, { locale, addSuffix: true });

  return formatted.replace('yaklaşık', '');
}
