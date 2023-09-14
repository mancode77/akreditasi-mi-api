export default function response (took, status, data, errors) {
  return {
    took,
    status,
    data,
    dataLength: data?.length ?? null,
    errors
  }
}
