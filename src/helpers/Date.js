import { format } from 'date-fns'
import { id } from 'date-fns/locale'

const timezoneIndonesia = { locale: id }

const formatDate = (date) => {
  try {
    return format(new Date(date), 'dd-MM-yyyy', timezoneIndonesia)
  } catch (error) {
    return date
  }
}

const formatDateTime = (date) => {
  return format(new Date(date), 'dd-MM-yyyy HH:mm:ss', timezoneIndonesia)
}

const formatDateSystem = (date) => {
  return format(new Date(date), 'yyyy-MM-dd', timezoneIndonesia)
}

const formatDateTimeSystem = (date) => {
  try {
    return format(new Date(date), 'yyyy-MM-dd HH:mm:ss', timezoneIndonesia)
  } catch (error) {
    return date
  }
}

const formatMonth = (date) => {
  return format(new Date(date), 'MMMM', timezoneIndonesia)
}

const formatYear = (date) => {
  return format(new Date(date), 'yyyy', timezoneIndonesia)
}

const formatTime = (date) => {
  return format(new Date(date), 'HH:mm:ss', timezoneIndonesia)
}

const formatMonthYear = (date) => {
  try {
    return format(new Date(date), 'MM-yyyy', timezoneIndonesia)
  } catch (error) {
    return date
  }
}

export {
  formatDate,
  formatDateSystem,
  formatDateTime,
  formatDateTimeSystem,
  formatMonth,
  formatYear,
  formatTime,
  formatMonthYear,
}
