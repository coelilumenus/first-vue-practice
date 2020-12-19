import store from '../store'

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
  const locale = store.getters.info.locale || 'ru-RU'
  return new Intl.DateTimeFormat(locale, options).format(new Date(value))
}
