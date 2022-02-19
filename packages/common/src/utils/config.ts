export const parseNumber = (value: string | undefined, defaultValue: number): number => {
  const parsed = Number(value);
  return isNaN(parsed) ? defaultValue : parsed;
};

export const parseString = (value: string | undefined, defaultValue = ''): string => {
  return value ?? defaultValue;
};
