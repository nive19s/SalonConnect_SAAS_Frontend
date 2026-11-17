const lkr = new Intl.NumberFormat('en-LK', { style: 'currency', currency: 'LKR', maximumFractionDigits: 0 });
export const formatPrice = (value: number) => lkr.format(value);

export const formatDuration = (minutes: number) => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return [h && `${h} h`, m && `${m} min`].filter(Boolean).join(' ');
};

const dayFmt = new Intl.DateTimeFormat('en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
export const formatDay = (iso: string) => dayFmt.format(new Date(`${iso}T00:00:00`));
