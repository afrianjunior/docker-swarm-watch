import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

export default function (value) {
  if (!value) return '-'
  if (typeof value === 'string' && value.includes('0001-01-01')) return '-'
  return dayjs(value).fromNow()
}