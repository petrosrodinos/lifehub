export const getLocalMonthQueryParams = (): { year: number; month: number } => {
  const now = new Date();

  return {
    year: now.getFullYear(),
    month: now.getMonth() + 1,
  };
};
