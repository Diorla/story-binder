export function truncateText(text: string, length?: number) {
  if (text.length > (length || 80)) {
    return text.substring(0, length || 80) + "...";
  }
  return text;
}
