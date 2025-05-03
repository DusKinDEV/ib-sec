export const formatResourceValue = (value: number): string => {
  if (value >= 1_000_000_000) {
    return `${(value / 1_000_000_000).toFixed(1)} KKK`;
  } else if (value >= 1_000_000) {
    return `${(value / 1_000_000).toFixed(1)} KK`;
  } else if (value >= 1_000) {
    return `${(value / 1_000).toFixed(1)} K`;
  }
  return value.toFixed(1);
};

export const formatCosts = (resources: { cash: number; gold: number; bbl: number; kg: number }, change: number): string => {
  return `${formatResourceValue(resources.cash)} $ ${formatResourceValue(resources.gold)} G ${formatResourceValue(resources.bbl)} bbl ${formatResourceValue(resources.kg)} kg ${change.toFixed(1)}%`;
};

export const formatPercentage = (value: number): string => {
  return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`;
};