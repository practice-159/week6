export const currency = (num: string | number | undefined) => {
  const n = Number(num) || 0;
  return n.toLocaleString();
};
