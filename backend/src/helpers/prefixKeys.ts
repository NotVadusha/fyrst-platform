export const prefixKeys = (prefix: string, obj: object) => {
  return Object.fromEntries(Object.entries(obj).map(([key, value]) => [`${prefix}_${key}`, value]));
};
