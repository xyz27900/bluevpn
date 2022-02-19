export const getError = (error: any): string => {
  return error?.data?.message ?? 'Server error';
};
