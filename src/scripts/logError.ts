export default function logError(file: string, fn: string, error: Error) {
  // eslint-disable-next-line no-console
  console.table({
    file,
    fn,
    name: error.name,
    message: error.message,
    stack: error.stack,
  });
}
