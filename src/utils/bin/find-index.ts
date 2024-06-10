export const findIndexStartsWithAlphabetical = (
  arr: string[],
  target: string,
): number => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].startsWith(target)) {
      return i;
    }
    if (arr[i].localeCompare(target) > 0) {
      break; // Since it's alphabetical, we can stop searching
    }
  }
  return -1; // Not found
};
