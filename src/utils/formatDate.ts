export const formatDate = (iso: Date) => {
  const date = new Date(iso);
  const dateStr = date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  const timeStr = date.toLocaleTimeString('en-US');
  return `${dateStr} @ ${timeStr}`;
};
