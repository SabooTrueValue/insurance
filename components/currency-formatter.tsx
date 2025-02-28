type currencyType = number;

export const currencyFormatter = (currency: currencyType) => {
  const c = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(currency);

  return c;
};
