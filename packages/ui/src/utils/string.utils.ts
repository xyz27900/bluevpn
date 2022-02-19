export const capitalize = (str: string): string => {
  return str.replace(str[0], str[0].toUpperCase());
};

export const kebabCase = (string: string): string => {
  return string.split('').map((char, idx) => {
    return char.toUpperCase() === char
      ? `${idx !== 0 ? '-' : ''}${char.toLowerCase()}`
      : char;
  }).join('');
};
