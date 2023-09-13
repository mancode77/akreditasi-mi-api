export default function response (took, status, data = null, errors = null) {
  return {
    took,
    status,
    data,
    dataLength: data.length,
    errors
  }
}
