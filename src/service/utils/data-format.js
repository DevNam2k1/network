/**
 * Format number of seconds into days, hours, minutes
 * @param {*} seconds 
 * @returns 
 */
export function formatTimeSecond(sec) {
  const secsPerDay = 86400
  const secsPerHour = 3600
  const secsPerMinute = 60

  let seconds = Math.abs(sec)
  let minus = this < 0 ? '-' : ''

  let days = Math.floor(seconds / secsPerDay)
  seconds = seconds % secsPerDay
  let hours = Math.floor(seconds / secsPerHour)
  seconds = seconds % secsPerHour
  let minutes = Math.floor(seconds / secsPerMinute)
  seconds = seconds % secsPerMinute

  let sDays = days > 0 ? new String(days).padStart(1, '0') + 'd ' : ''
  let sHours = hours > 0 ? new String(hours).padStart(2, '0') + 'h ' : ''
  let sMinutes = new String(minutes).padStart(2, '0') + 'm '

  return `${minus}${sDays}${sHours}${sMinutes}${seconds}s`
}

// https://stackoverflow.com/questions/10420352/converting-file-size-in-bytes-to-human-readable-string
/**
 * Format bytes as human-readable text.
 *
 * @param bytes Number of bytes.
 * @param si True to use metric (SI) units, aka powers of 1000. False to use
 *           binary (IEC), aka powers of 1024.
 * @param dp Number of decimal places to display.
 *
 * @return Formatted string.
 */
export function humanReadableSize(bytes, si = false, dp = 1) {
  const thresh = si ? 1000 : 1024

  if (Math.abs(bytes) < thresh) {
    return bytes + ' B'
  }

  const units = si
    ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
    : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB']
  let u = -1
  const r = 10 ** dp

  do {
    bytes /= thresh
    ++u
  } while (
    Math.round(Math.abs(bytes) * r) / r >= thresh &&
    u < units?.length - 1
  )

  return bytes.toFixed(dp) + ' ' + units[u]
}
