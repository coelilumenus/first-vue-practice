export default function dateFilter (value, dateFormat = 'datetime') {
  const options = {}
  if (dateFormat.includes('date')) {
    options.day = '2-digit'
    options.month = 'long'
    options.year = 'numeric'
  }
  if (dateFormat.includes('time')) {
    options.hour = '2-digit'
    options.minute = '2-digit'
    options.second = '2-digit'
  }
  return new Intl.DateTimeFormat('ru-RU', options).format(new Date(value))
}
