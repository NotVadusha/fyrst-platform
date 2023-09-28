export function getFilterParams<T>(obj: T, props: (keyof T)[]): Record<string, any>[] {
  const result: Record<string, any>[] = [];

  for (const prop of props) {
    if (obj[prop] !== undefined) {
      result.push({ [prop]: obj[prop] });
    }
  }

  return result;
}
